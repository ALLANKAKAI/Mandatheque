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
import { withNavigation } from 'react-navigation';
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { BOOK_ENDPOINT, ENDPOINT } from "../constants/apis";
import { CATEGORIES } from "../constants/categories";
import { errorAlert, successAlert } from "../components/Alerts";
import * as DocumentPicker from 'expo-document-picker';

const { width, height } = Dimensions.get("screen");

class UpdateBook extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const item = navigation.state.params.item;
        this.state = {
            'id': item.id,
            'name': item.name,
            'author': item.author,
            'category': item.category,
            'pdf_file': {
                uri: ENDPOINT + item.pdf_file,
                type: 'application/pdf',
                name: item.name + '.pdf'
            }
        }
    }
    

    changeName = (target) => {
        this.setState({ 'name': target.nativeEvent.text });
    }

    changeAuthor = (target) => {
        this.setState({ 'author': target.nativeEvent.text });
    }

    changeCategory = (target) => {
        this.setState({ 'category': target.nativeEvent.text });
    }

    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        
        if (result.type == 'success') {
            this.setState({ 'pdf_file': result })
        }
    }

    upload = async () => {
        var token = await AsyncStorage.getItem('token');
        
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('author', this.state.author);
        data.append('category', this.state.category);
        data.append('pdf_file', {
            uri: this.state.pdf_file.uri,
            type: 'application/pdf',
            name: this.state.pdf_file.name
        })

        fetch(BOOK_ENDPOINT + '/' + this.state.id,
            {
                headers: {
                    'Authorization': `Token ${token}`
                },
                method: 'PUT',
                body: data
            })
            .then(res => res.json())
            .then((result) => {
                if (result.id) {
                    successAlert('Book updated successfully');
                    return true;
                }
                errorAlert("Fill all fields");
            })
            .catch((error) => {
                console.log(error);
                errorAlert('Network Error !');
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
                                        Edit Book!
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
                                            <Block width={width * 0.8} >
                                                <Input
                                                    value={this.state.author}
                                                    onChange={this.changeAuthor}
                                                    placeholder="Author"
                                                />
                                            </Block>
                                            <Block flex center width={width * 0.8} style={styles.picker}>
                                                <Picker
                                                    selectedValue={this.state.category}
                                                    style={styles.createButton}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        this.setState({ category: itemValue })
                                                    }>
                                                    <Picker.Item label="Choose category" value="" />
                                                    {CATEGORIES.map((item, key) => {
                                                        return <Picker.Item key={key} label={item[1]} value={item[0]} />
                                                    })}

                                                </Picker>
                                            </Block>
                                            <Block middle width={width * 0.8} style={{ marginBottom: 5 }}>
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
                                                <Button  onPress={this.upload} color="primary" style={styles.createButton}>
                                                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                        UPDATE
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
    picker: {
        width: width * 0.8,
        marginTop: 10,
        borderColor: "#8898AA",
        borderRadius: 4,
        backgroundColor: "#fff",
        marginBottom: 10,
        elevation: 1,
        overflow: "hidden"

    },
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
        marginTop: 5
    }
});

export default withNavigation(UpdateBook);
