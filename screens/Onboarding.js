import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { withNavigation } from 'react-navigation';
const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {

   checkToken = async () =>{
      const token = await AsyncStorage.getItem('token');
      const {navigation} = this.props;
      if(token){
        navigation.navigate('Home');
        return true;
      }
      navigation.navigate('Login');
  }

  
  componentDidMount(){
    setTimeout(() => {this.checkToken()}, 3000);
  }
  
  render() {


    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        </Block>
        <Block center>
          <Image source={Images.Logo3} style={styles.logo} />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 120,
    zIndex: 2,
    position: 'relative',
    marginTop: '-120%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default withNavigation(Onboarding);
