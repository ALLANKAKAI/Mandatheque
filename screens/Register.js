import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme} from "../constants";
import { SIGNUP_ENDPOINT } from "../constants/apis";
import {successAlert,errorAlert} from "../components/Alerts"
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      "email": "",
      "phone": "",
      "name": "",
      "password": "",
      "password2": ""
    };
  }
  

  changeEmail = (target) => {
    this.setState({'email':target.nativeEvent.text});
  }

  changeName = (target) => {
    this.setState({'name':target.nativeEvent.text});
  }

  changePhone = (target) => {
    this.setState({'phone':target.nativeEvent.text});
  }

  changePass1 = (target) => {
    this.setState({'password':target.nativeEvent.text});
  }

  changePass2 = (target) => {
    this.setState({'password2':target.nativeEvent.text});
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  signup = () => {
    if(this.state.password != this.state.password2){
      errorAlert('Passwords dont match');
      return false;
    }
    if(this.state.password.length < 8){
      errorAlert('Minimun length for password is 8')
      return false;
    }

    const {navigation} = this.props;

    fetch(SIGNUP_ENDPOINT,
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
        errorAlert(toString(result.error.email));
        return false;
      }

      this._onValueChange('token',result.token);
      successAlert('Account created successfully');
      navigation.navigate('Home');

    })
    .catch((error) =>{
      console.log(error);
      errorAlert('Network Error !');
    })

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
        <Block flex middle>
          <Block style={styles.registerContainer}>
           <ScrollView>   
              <Block flex={0.25} middle style={styles.socialConnect, {marginTop: 15}}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              
              <Block flex>
                
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.changeName}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        name="email"
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
                      <Input
                        borderless
                        placeholder="Phone NUmber"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.changePhone}
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
                        name="password1"
                        value={this.state.password}
                        onChange={this.changePass1}
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
                      <Input
                        password
                        borderless
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.changePass2}
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
                    
                    <Block middle>
                      <Button onPress={this.signup} color="primary" style={styles.createButton} >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
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

export default Register;
