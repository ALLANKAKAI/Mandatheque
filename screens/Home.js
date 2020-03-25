import React from 'react';
import { StyleSheet, Dimensions,AsyncStorage,ScrollView,ActivityIndicator,View} from 'react-native';
import { Block, theme,Button,Text } from 'galio-framework';
import { withNavigation } from 'react-navigation';
import { Card } from '../components';
import Icon from '../components/Icon';
import Input from '../components/Input';
import GridView from "react-native-easy-grid-view";
import { BOOKS_ENDPOINT } from "../constants/apis";
import argonTheme from '../constants/Theme';
import {errorAlert} from "../components/Alerts"

var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Home extends React.Component {
    constructor(){
      super();
     
      this.state = {
        books:[],
        cellWidth: 0,
        cellHeight: 0,
        search:'',
        isLoading:false
      }
      
    }

  _renderCell = (item) => {
    return <Card edit={false} item={item} />;
   }

  async fetchBooks(search=null) {

    var token = await AsyncStorage.getItem('token');
    
    var endpoint = BOOKS_ENDPOINT;
    if(search){
      endpoint = BOOKS_ENDPOINT+'?s='+search
    }
    this.setState({isLoading:true});
    fetch(endpoint,
      {
        headers:{
          'Authorization':`Token ${token}`
        },
        method:'GET'
      })
    .then(res => res.json())
    .then((result) => {
      this.setState({isLoading:false});
      if(result.books){
        
      this.setState({books:result.books});
      }
      
    })
    .catch((error) =>{
      this.setState({isLoading:false});
      console.log(error);
      errorAlert('Network Error !');
    })
  }

 
  search = async() =>{
    if(this.state.search != ''){
      this.fetchBooks(this.state.search)
    }
  }

  componentDidMount(){
    this.fetchBooks();
  }

  render() {
    const { navigation } = this.props;

    return <ScrollView>
       <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onSubmitEditing={this.search}
        value={this.state.search}
        onChange={(target)=> this.setState({'search':target.nativeEvent.text})}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
      <Block  middle row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => this.fetchBooks()}>
          <Block row middle>
            <Text size={20} style={styles.tabTitle}>{'All Books'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Categories')}>
          <Block row middle>
            <Text size={20} style={styles.tabTitle}>{'Categories'}</Text>
          </Block>
        </Button>
      </Block>
      {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
              <GridView dataSource={ds.cloneWithCells(this.state.books,2)}
              spacing={8}
              style={{padding:16}}
              renderCell={this._renderCell}
            />
        </ScrollView>
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  }
});

export default withNavigation(Home);
