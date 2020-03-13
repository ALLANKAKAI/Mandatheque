import {Alert} from "react-native";

export const errorAlert = (message) => {
    return Alert.alert(
        'Error',
        message,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
}

export const successAlert = (message) => {
    return Alert.alert(
        'Success',
        message,
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
}