import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { BOOKS_ENDPOINT } from "../constants/apis";
import {CATEGORIES} from "../constants/categories";
import {errorAlert,successAlert} from "../constants/Alerts";
import * as DocumentPicker from 'expo-document-picker';

const { width, height } = Dimensions.get("screen");

class SingleUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      'name':'',
      'author':'',
      'category':'',
      'pdf_file':{},
    }
  }

  changeName = (target) => {
    this.setState({'name':target.nativeEvent.text});
  }

  changeAuthor = (target) => {
    this.setState({'author':target.nativeEvent.text});
  }

  changeCategory = (target) => {
    this.setState({'category':target.nativeEvent.text});
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({type:'application/pdf'});
    console.log(result);
    if(result.type == 'success'){
    this.setState({'pdf_file':result})
    }
}

 upload = async() => {
  var token = await AsyncStorage.getItem('token');
  console.log(this.state)
  const data = new FormData();
  data.append('name',this.state.name);
  data.append('author',this.state.author);
  data.append('category',this.state.category);
  data.append('pdf_file',{
    uri:this.state.pdf_file.uri,
    type:'application/pdf',
    name:this.state.pdf_file.name})

    fetch(BOOKS_ENDPOINT,
      {
        headers:{
          'Authorization':`Token ${token}`
        },
        method:'POST',
        body:data
      })
    .then(res => res.json())
    .then((result) => {
      if(result.error){
        errorAlert(result.message);
        return false;
      }
      successAlert('Book uploaded successfully');
      
    })
    .catch((error) =>{
      console.log(error)
    })
}

  render() {
    return (

      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <ScrollView>
                <Block flex={0.25} middle style={{ marginTop: 15 }}>
                  <Text color="#8898AA" size={16}>
                    Upload Your Book!
                </Text>
                </Block>

                <Block flex>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginTop: 10 }}>
                        <Input
                        value={this.state.name}
                        onChange={this.changeName}
                          placeholder="Book Title"
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                        <Input
                          value={this.state.author}
                          onChange={this.changeAuthor}
                          placeholder="Author"
                        />
                      </Block>
                      <Block middle width={width * 0.8} style={{ marginBottom: 10 }}>
                        <Picker
                          selectedValue={this.state.category}
                          style={styles.createButton}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({ category: itemValue })
                          }>
                            <Picker.Item label="Choose category" value="" />
                            {CATEGORIES.map((item,key) => {
                                return <Picker.Item key={key} label={item[1]} value={item[0]} />
                            })}
                          
                        </Picker>
                      </Block>
                      <Block middle width={width * 0.8} style={{ marginBottom: 10 }}>
                        <Text>
                          {this.state.pdf_file.name}
                          </Text>
                      <Button onPress={this._pickDocument} color="info" style={styles.createButton}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Choose file
                        </Text>
                        </Button>
                      </Block>

                      <Block middle>
                        <Button onPress={this.upload} color="primary" style={styles.createButton}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            UPLOAD!
                        </Text>
                        </Button>
                      </Block>
                    </KeyboardAvoidingView>
                  </Block>

                </Block>
              </ScrollView>
            </Block>

          </Block>
        </ImageBackground>
      </Block>

    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default SingleUpload;
