import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { withNavigation } from 'react-navigation';

import { Block, Text} from "galio-framework";

import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Contact extends React.Component {
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
                      <Text center size={24}>
                          Email us: 
                      </Text>
                      <Text center style={{ marginBottom: 30 }}>
                          info@mandatheque.com 
                      </Text>
                      <Text center size={24}>
                          Call us: 
                      </Text>
                      <Text center>
                          +25471234567 
                      </Text> 
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
    height: height * 0.3,
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

export default withNavigation(Contact);
