import React from "react";
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  AsyncStorage
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import {ENDPOINT} from "../constants/apis"
import { HeaderHeight } from "../constants/utils";
import {successAlert} from "../components/Alerts"

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class SingleBook extends React.Component {

  constructor(){
    super();
    this.state = {
      saved:false
    }
  }


  saveBook = async () =>{
    let books = await AsyncStorage.getItem('books');
    const item = this.props.navigation.state.params.item;

    if(books){
      books = JSON.parse(books);
      books.push(item);
    }
    else{
      books = [item]
    }
    await AsyncStorage.setItem('books',JSON.stringify(books));
    this.setState({saved:true});
    
  }

  unsaveBook = async () =>{
    let books = await AsyncStorage.getItem('books');
    books = JSON.parse(books);
    const item = this.props.navigation.state.params.item
    books.splice(books.findIndex(x => x.id == item.id), 1);

    books = JSON.stringify(books);
    await AsyncStorage.setItem('books',books);
    this.setState({saved:false});
    this.props.navigation.state.params.removeBook(item.id);
  }

  checkSaved = async () =>{
    let books = await AsyncStorage.getItem('books');
    const item = this.props.navigation.state.params.item;
    if(books){
      books = JSON.parse(books);
      if(books.find(x => x.id == item.id)){
        this.setState({saved:true});
      }
    }
  }


  componentDidMount(){
    this.checkSaved();
  }
  
  render() {
    const { navigation} = this.props;
    const item = navigation.state.params.item
    
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%'}}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: ENDPOINT+item.thumbnail,cache: 'only-if-cached' }}
                    style={styles.avatar}
                  />
                </Block>
                
                <Block flex>
                  <Block  style={styles.nameInfo}>
                  <Text  size={16} color="#32325D">
                        Book Title:  
                        <Text bold size={20} color="#32325D"> {item.name} </Text>
                    </Text> 
                    <Text  size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Author:
                      <Text bold size={20} color="#32325D"> {item.author} </Text>
                    </Text>
                    <Text  size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Category:
                      <Text bold size={20} color="#32325D"> {item.category} </Text>
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                <Block middle>
                    
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Block center>
                      <Button onPress={()=> navigation.navigate('PDFViewer',{'item':item})} color="error" style={styles.button} >
                            Read Book
                        </Button>
                        {this.state.saved ? <Button onPress={this.unsaveBook}  style={styles.button} >
      Unsave Book
  </Button> : <Button onPress={this.saveBook} color="default" style={styles.button} >
    Save Book
</Button> }
                        
                      </Block>
                      
                  </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  unsave:{
    backgroundColor:'#C0C0C0'
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 2,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  }
});

export default withNavigation(SingleBook);
