/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator

} from 'react-navigation'
import Splash from './Splash';
import Login from './src/component/login/Login';
import Dashboard from './src/component/dashboard/Dashboard';

class App extends Component{
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppStacknavigator = createStackNavigator({
  WelcomeScreen : {
    screen : Login , 
    headerMode: 'none',
    navigationOptions : ({navigation}) => {
      return {
        header: null,
      };
     }
  },
  DashboardScreen : { 
    screen : Dashboard , 
    navigationOptions : ({navigation}) => {
      return {
       headerTitle:"Dashboard"
      };
     }
  }
})
const AppContainer = createAppContainer(AppStacknavigator);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
