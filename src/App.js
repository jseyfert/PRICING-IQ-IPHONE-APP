import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Config from 'react-native-config'
import { GoogleSignin } from 'react-native-google-signin';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DetailScreen from './screens/DetailScreen';
import SubmitScreen from './screens/SubmitScreen';
import ProfileScreen from './screens/ProfileScreen';
// git add-commit -m 'My commit message'

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen},
  auth: { screen: AuthScreen},
  main: {
    screen: DrawerNavigator({
      profile: { screen: ProfileScreen},
      detail: { screen: DetailScreen},
      setting: { screen: SubmitScreen},
    })
  }
}, {
  lazy: true,
  navigationOptions: {
    tabBarVisible: false
  }
});

// const Stack = {
// 	FirstView: {
// 		screen: ProfileScreen
// 	},
// 	SecondView: {
// 		screen: DetailScreen
// 	},
// 	ThirdView: {
// 		screen: SubmitScreen
// 	}
// };
//
// const DrawerRoutes = {
// 	FirstViewStack: {
// 		name: 'FirstViewStack',
// 		screen: StackNavigator(Stack, { initialRouteName: 'FirstView' })
// 	},
// 	SecondViewStack: {
// 		name: 'SecondViewStack',
// 		screen: StackNavigator(Stack, { initialRouteName: 'SecondView' })
// 	},
// 	ThirdViewStack: {
// 		name: 'ThirdViewStack',
// 		screen: StackNavigator(Stack, { initialRouteName: 'ThirdView' })
// 	},
// };
//
// const MainNavigator =
// 	StackNavigator({
// 		Drawer: {
// 			name: 'Drawer',
// 			screen: DrawerNavigator(
// 				DrawerRoutes,
// 			),
// 		},
// 		...Stack
// 	},
// 		{
// 			headerMode: 'none'
// 		}
// 	);



export default class App extends React.Component {
  async componentWillMount() {

    const config = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    databaseURL: Config.FIREBASE_DATABASE_URL,
    projectId: Config.FIREBASE_PROJECT_ID,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
    };
    await firebase.initializeApp(config);

    await GoogleSignin.configure({
      iosClientId: Config.IOS_CLIENT_ID ,
    })
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}
