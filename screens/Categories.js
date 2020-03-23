import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  AsyncStorage,
  Picker,
  ActivityIndicator
} from "react-native";


//galio
import { Block } from "galio-framework";
import { withNavigation } from 'react-navigation';
//argon
import { argonTheme } from "../constants/";
import { Card } from "../components/";
import { CATEGORIES } from "../constants/categories"
const { width } = Dimensions.get("screen");

import { BOOKS_ENDPOINT } from "../constants/apis";
import {errorAlert} from "../components/Alerts"
import GridView from "react-native-easy-grid-view";

var ds = new GridView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Categories extends React.Component {
  constructor() {
    super();
    
    this.state = {
      dataSource: ds.cloneWithCells([], 2),
      cellWidth: 0,
      cellHeight: 0,
      category:'',
      isLoading:false
    }

  }

  _renderCell = (item) => {
    return <Card edit={false} item={item} />;

  }

  changeCategory = (itemValue, itemIndex) =>{
      this.setState({category:itemValue});
      if (itemValue != ''){
          this.fetchBooks(itemValue);
          return true;
      }
      this.setState({dataSource:ds.cloneWithCells([], 2)});
  }

  async fetchBooks(category) {

    var token = await AsyncStorage.getItem('token');
    this.setState({isLoading:true});
    fetch(BOOKS_ENDPOINT+'/'+category,
      {
        headers: {
          'Authorization': `Token ${token}`
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then((result) => {
        this.setState({isLoading:false});
        if (result.results) {
          this.setState({ 'dataSource': ds.cloneWithCells(result.results, 2) });
        }

      })
      .catch((error) => {
        this.setState({isLoading:false});
        console.log(error);
        errorAlert('Network Error !');
      })
  }



  render() {
    
    return <View >    
      <View  style={styles.container}>
        <Block center>
          <Picker
            selectedValue={this.state.category}
            style={styles.createButton}
            onValueChange={this.changeCategory}>
            <Picker.Item 
            left
            label="Choose Category" value="" />
            {CATEGORIES.map((item, key) => {
              return <Picker.Item key={key} label={item[1]} value={item[0]} />
            })}
          </Picker>
        </Block>
      </View>
      {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <GridView dataSource={this.state.dataSource}
        spacing={8}
        style={{ padding: 16 }}
        renderCell={this._renderCell}

      >
        </GridView>
    </View>
  }
 
}

const styles = StyleSheet.create({
  
  
  container:{
    marginTop: 10,
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  createButton: {
    width: width * 0.5,
    marginTop: 5
  }
});

export default withNavigation(Categories);
