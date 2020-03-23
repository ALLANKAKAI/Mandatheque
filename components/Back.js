import React from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { withNavigation } from 'react-navigation';

class HandleBack extends React.Component {

constructor(props){
    super(props);

    this.didFocus = props.navigation.addListener(this.didFocus,
        payload)
}
  render() {

    return this.props.children;
  }
} 

export default withNavigation(HandleBack);