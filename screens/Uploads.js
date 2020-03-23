import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { withNavigation } from 'react-navigation';

//galio
import { Block, Text, theme } from "galio-framework";
//argon
import {  argonTheme } from "../constants/";
import { Button, Card } from "../components/";
import {errorAlert} from "../components/Alerts";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
import { UPLOADS_ENDPOINT } from "../constants/apis";
import GridView from "react-native-easy-grid-view";
var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Uploads extends React.Component {
  constructor() {
    super();
    
    this.state = {
      dataSource: ds.cloneWithCells([], 2),
      cellWidth: 0,
      cellHeight: 0,
      isLoading:false
    }

  }

  _renderCell = (item) => {
    return <Card edit={true} item={item} />;

  }

  async fetchBooks() {

    var token = await AsyncStorage.getItem('token');
    this.setState({isLoading:true});
    fetch(UPLOADS_ENDPOINT,
      {
        headers: {
          'Authorization': `Token ${token}`
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then((result) => {
        this.setState({isLoading:false});
        if (result.books) {
          this.setState({ 'dataSource': ds.cloneWithCells(result.books, 2) });
        }

      })
      .catch((error) => {
        this.setState({isLoading:false});
        console.log(error);
        errorAlert('Network Error !');
      })
  }

  componentDidMount() {
    this.fetchBooks();
  }

  
  

  render() {
    const { navigation} = this.props;
    return <ScrollView>
      <Text center bold size={16} style={styles.title}>
            My Uploads
          </Text>
         
      <Block center>
        <Button color="default" style={styles.button} onPress={() => navigation.navigate('SingleUpload')}>
          CLICK HERE TO UPLOAD!
        </Button>
      </Block>
      {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" />:null}
      <GridView dataSource={this.state.dataSource}
        spacing={8}
        style={{ padding: 16 }}
        renderCell={this._renderCell}

      />
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
});

export default withNavigation(Uploads);
