import React, { Component } from "react";
// import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import OpeningPage from './components/OpeningPage'
import Login from './components/Login';
import GameScreen from './components/GameScreen'
import Store from './components/Store'
import SignUp from './components/SignUp'
import  {I18nManager} from "react-native"

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const RootStack = createStackNavigator(
  {
    Login,
    OpeningPage,
    GameScreen,
    Store,
    SignUp
  },
  {

    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(RootStack);

class App extends Component {

  render() {
    return ( 
      <AppContainer />
    );
  }
}

export default App;


