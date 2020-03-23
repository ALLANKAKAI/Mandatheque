import React from 'react';
import { WebView } from 'react-native';
import { ENDPOINT } from "../constants/apis"


export default class PDFViewer extends React.Component {
    render() {
        const item = this.props.navigation.state.params.item;

        const source = ENDPOINT + item.pdf_file;
        
        return (
                <WebView
                    source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url='+source }}
                    style={{ marginTop: 20 }}
                />
            
        )
    }
}

