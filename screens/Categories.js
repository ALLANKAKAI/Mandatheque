import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  AsyncStorage,
  Picker
} from "react-native";


//galio
import { Text, theme } from "galio-framework";
//argon
import { argonTheme } from "../constants/";
import { Card } from "../components/";
import { CATEGORIES } from "../constants/categories"
const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
import { BOOKS_ENDPOINT } from "../constants/apis";
import GridView from "react-native-easy-grid-view";

var ds = new GridView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Categories extends React.Component {
  constructor() {
    super();
    
    this.state = {
      dataSource: ds.cloneWithCells([], 2),
      cellWidth: 0,
      cellHeight: 0,
      category:''
    }

  }

  _renderCell = (item) => {
    return <Card item={item} />;

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

    fetch(BOOKS_ENDPOINT+'/'+category,
      {
        headers: {
          'Authorization': `Token ${token}`
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then((result) => {
        if (result.results) {
          this.setState({ 'dataSource': ds.cloneWithCells(result.results, 2) });
        }

      })
      .catch((error) => {
        console.log(error)
      })
  }


  render() {
    return <View >
      <View style={styles.container}>
      <Picker
        selectedValue={this.state.category}
        style={styles.picker}
        onValueChange={this.changeCategory}>
        <Picker.Item label="Choose Category" value="" />
        {CATEGORIES.map((item, key) => {
          return <Picker.Item key={key} label={item[1]} value={item[0]} />
        })}
      </Picker>
      </View>
      <GridView dataSource={this.state.dataSource}
        spacing={8}
        style={{ padding: 16 }}
        renderCell={this._renderCell}

      />
    </View>
  }
}

const styles = StyleSheet.create({
  
  picker: {
    width: width * 0.6,
    marginTop: 25,
    backgroundColor:'#999ef0'
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Categories;
