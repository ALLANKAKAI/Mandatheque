import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Block,  Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import {USER_ENDPOINT} from "../constants/apis"
import { successAlert,errorAlert } from "../constants/Alerts";

const { width, height } = Dimensions.get("screen");

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    const {navigation} = this.props;
    this.state = {
      "phone": navigation.state.params.phone,
      "name": navigation.state.params.name,
      "password":"",
      "password2":""
    };
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


   save = async() => {
    var token = await AsyncStorage.getItem('token');

    if(this.state.password != this.state.password2){
      errorAlert('Passwords dont match');
      return false;
    }
    if(this.state.password.length < 8 && this.state.password != ""){
      errorAlert('Minimun length for password is 8')
      return false;
    }


    fetch(USER_ENDPOINT,
      {
        headers:{
          'Authorization':`Token ${token}`,
          'Content-Type':'application/json'
        },
        method:'PUT',
        body:JSON.stringify({'user':this.state})
      })
    .then(res => res.json())
    .then((result) => {
      
      if(result.error){
        errorAlert(result.error.email);
        return false;
      }
      successAlert('Profile updated')

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
              <Block flex={0.25} middle style={ {marginTop: 15}}>
                <Text color="#8898AA" size={16}>
                  Edit your Profile
                </Text>
              </Block>
              
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.changeName}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      
                      <Input
                        borderless
                        placeholder="Phone Number"
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
                      <Input
                        password
                        borderless
                        placeholder="Password"
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
                        value={this.state.password2}
                        onChange={this.changePass2}
                        placeholder="Confirm Password"
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
                      <Button onPress={this.save} color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          SAVE
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
    height: height * 0.6,
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

export default EditProfile;
