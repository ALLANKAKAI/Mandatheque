import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler
} from "react-native";


import { Block,  Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { LOGIN_ENDPOINT } from "../constants/apis";
import {errorAlert} from "../components/Alerts"

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      "email": "",
      "password": ""
    };
  }
  

  changeEmail = (target) => {
    this.setState({'email':target.nativeEvent.text});
  }

  changePass = (target) => {
    this.setState({'password':target.nativeEvent.text});
  }

  async _setToken(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _removeToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if(token){
        await AsyncStorage.removeItem('token');
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  login = () => {
    const {navigation} = this.props;

    fetch(LOGIN_ENDPOINT,
    {
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      method:'POST',
      body:JSON.stringify(this.state)
    })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    if(result.error){
      errorAlert(result.error)
      return false;
    }

    this._setToken('token',result.token);

    navigation.navigate('Home');

  })
  .catch((error) =>{
    console.log(error);
    errorAlert('Network Error !');
  })
  }

  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress",()=>{return true});
    this._removeToken();
  }

  render() {
    const { navigation} = this.props;

    
    return (
      
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
        <Block flex middle >
          <Block style={styles.registerContainer}>
           <ScrollView>   
              

              <Block flex>
                
                <Block flex center style={{ marginTop: 15 }}>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.changeEmail}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                     
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changePass}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row style={{ marginBottom: 15 }}>
                      <Button onPress={this.login} color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Log in
                        </Text>
                      </Button>
                      <Button color="primary" style={styles.createButton} onPress={() => navigation.navigate('Account')}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Sign Up
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
    height: height * 0.4,
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
    borderColor: "#8898AA",
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
    width: width * 0.4,
    marginTop: 25,
    marginRight: 2
  }
});

export default Login;
