import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Library from "../screens/Library";
import Uploads from "../screens/Uploads";
import Login from "../screens/Login";
import SingleUpload from "../screens/SingleUpload";
import EditProfile from "../screens/EditProfile";
import Subscription from "../screens/Subscription";
import Checkout from "../screens/Checkout";
import Contact from "../screens/Contact";
import Categories from "../screens/Categories";
import SingleBook from "../screens/SingleBook";
import EditBook from "../screens/EditBook";
import UpdateBook from "../screens/UpdateBook";
import PDFViewer from "../screens/PdfViewer"

// drawer
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";


const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const CategoriesStack = createStackNavigator({
  Categories: {
    screen: Categories,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Categories" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});


const SubscriptionStack = createStackNavigator({
  Subscription: {
    screen: Subscription,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Subscription" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const LibraryStack = createStackNavigator({
  Library: {
    screen: Library,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Library" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});


const UploadsStack = createStackNavigator({
  Uploads: {
    screen: Uploads,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="My Uploads" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);


const NavStack = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        headerTransparent: true,
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: (<Header  title="Home" navigation={navigation} />),
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Home" />
        )
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header  transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Profile" />
        ),
        headerTransparent: true
      })
    },
    Uploads: {
      screen: Uploads,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="My Uploads" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Library: {
      screen: Library,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Library" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Subscription: {
      screen: Subscription,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Subscription" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Categories: {
      screen: Categories,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Categories" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Elements: {
      screen: Elements,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Elements" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    SingleBook: {
      screen: SingleBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="SingleBook" title="Single Book" />
        )
      })
    },
    EditBook: {
      screen: EditBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="EditBook" title="Edit Book" />
        )
      })
    },
    UpdateBook: {
      screen: UpdateBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="UpdateBook" title="Update Book" />
        )
      })
    },
    Contact: {
      screen: Contact,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Contact" title="Contact Us" />
        )
      })
    },
    Login: {
      screen: Login,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Login" title="Sign Out" />
        )
      })
    },
    SingleUpload: {
      screen: SingleUpload,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="SingleUpload" title="SingleUpload" />
        )
      })
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="EditProfile" title="EditProfile" />
        )
      })
    },
    PDFViewer: {
      screen: PDFViewer,
      navigationOptions: ({navigation}) => ({
        header: <Header  title="PDF" navigation={navigation} />,
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="PDFViewer" title="PDF" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    }, 
    Checkout: {
      screen: Checkout,
      navigationOptions: navOpt => ({
        headerTransparent: true,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Checkout" title="Checkout" />
        )
      })
    }
  },
  {
    initialRouteName: 'Onboarding',
    headerMode: 'screen',
  }
);



// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
/* const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Home" />
        )
      })
    },
    Library: {
      screen: LibraryStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Library" title="My Library" />
        )
      })
    },
    SingleBook: {
      screen: SingleBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="SingleBook" title="Single Book" />
        )
      })
    },
    EditBook: {
      screen: EditBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="EditBook" title="Edit Book" />
        )
      })
    },
    UpdateBook: {
      screen: UpdateBook,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="UpdateBook" title="Update Book" />
        )
      })
    },
    Categories: {
      screen: CategoriesStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Categories" title="Categories" />
        )
      })
    },
    Uploads: {
      screen: UploadsStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Uploads" title="My Uploads" />
        )
      })
    },
    Subscription: {
      screen: SubscriptionStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Subscription" title="My Subscription"/>
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Contact: {
      screen: Contact,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Contact" title="Contact Us" />
        )
      })
    },
    Login: {
      screen: Login,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Login" title="Sign Out" />
        )
      })
    },
    SingleUpload: {
      screen: SingleUpload,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="SingleUpload" title="SingleUpload" />
        )
      })
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="EditProfile" title="EditProfile" />
        )
      })
    },
    PDFViewer: {
      screen: PDFViewer,
      navigationOptions: ({navigation}) => ({
        header: <Header  title="PDF" navigation={navigation} />,
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="PDFViewer" title="PDF" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    }, 
    Checkout: {
      screen: Checkout,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Checkout" title="Checkout" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    }
    
  },
  Menu
);
*/

const AppStack = createDrawerNavigator(
  {
    Menu: {
      screen: NavStack,
    },
    Home: {
      screen: Home,
    },
    Library:{
      screen:Library,
    },
    Uploads:{
      screen: Uploads
    },
    Subscription:{
      
      screen: Subscription
    },
    Profile:{
      screen:Profile
    },
    Contact:{
      screen: Contact
    },
    Logout:{
      screen: Login
    }
     
  }
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
