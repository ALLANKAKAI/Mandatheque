import React from "react";
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  AsyncStorage,
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import {BOOK_ENDPOINT,ENDPOINT} from "../constants/apis"
import { HeaderHeight } from "../constants/utils";
import {errorAlert,successAlert} from "../components/Alerts"

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class EditBook extends React.Component {
  constructor(props){
    super(props);
    const {navigation} = this.props;
    this.state = {
      author:navigation.state.params.item.author,
      name:navigation.state.params.item.name,
      category:navigation.state.params.item.category,
      thumbnail:navigation.state.params.item.thumbnail
    }
  }

  updateDetails = (obj) =>{
    this.setState(obj);
  }

    deleteBook = () => {
        Alert.alert(
            'Are You sure ?',
            'Once you a book is deleted, it cannot be recovered',
            [
                { text: 'CANCEL'},
                { text: 'OK', onPress: () => this.deleteRequest() }
            ],
            {cancelable: true},
          );
    }


  deleteRequest = async () =>{
    var token = await AsyncStorage.getItem('token');
    const {navigation} = this.props;
    const item = navigation.state.params.item;


        fetch(BOOK_ENDPOINT+'/'+item.id,
            {
              headers:{
                'Authorization':`Token ${token}`
              },
              method:'DELETE'
            })
          .then(res => res.json())
          .then((result) => {
            
            if(result.error){
              errorAlert(result.error);
              return false;
            }
            //delete this.props.state.params.item;
            successAlert('Book deleted successfully');
            this.props.navigation.state.params.removeBook(item.id);
            navigation.navigate('Uploads');
      
          })
          .catch((error) =>{
            console.log(error);
            errorAlert('Network Error !');
          })
  }


  render() {
    
    const { navigation} = this.props;
    const item = navigation.state.params.item

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: "35%" }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: ENDPOINT+this.state.thumbnail }}
                    style={styles.avatar}
                  />
                </Block>
                
                <Block flex>
                  <Block  style={styles.nameInfo}>
                   
                    <Text  size={16} color="#32325D">
                        Book Title:  
                        <Text bold size={20} color="#32325D"> {this.state.name}</Text>
                    </Text>
                       
                    <Text  size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Author:
                      <Text bold size={20} color="#32325D"> {this.state.author} </Text>
                    </Text>
                    <Text  size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Category:
                      <Text bold size={20} color="#32325D"> {this.state.category} </Text>
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                <Block middle>
                    
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Block center>
                        <Button color="default" style={styles.button}>
                            Read Book
                        </Button>
                        <Button  style={styles.edit} onPress={() => navigation.navigate('UpdateBook',{'item':item,'updateBook':this.props.navigation.state.params.updateBook,'updateDetails':this.updateDetails})} >
                            Edit Book
                        </Button>
                        <Button onPress={this.deleteBook} color="error" style={styles.button} >
                            Delete Book
                        </Button>
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
    marginTop: 25
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
  },
  edit: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    color: "#c0c0c0"
  }
});

export default withNavigation(EditBook);
