/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';

import Login from './app/component/Login';
import Regin from './app/component/Regin';
import Index from './app/component/Index';
import UserIndex from './app/component/UserIndex';

import { StackNavigator } from 'react-navigation';

class App extends Component{
    render(){
        return(
            <RootStack />
        );
    }
}

const RootStack = StackNavigator({
   Index: {screen: Index},
   Login: {screen: Login},
   Regin: {screen: Regin},
   UserIndex: {screen: UserIndex}
},{
     initialRouteName: 'Login',
     mode: 'card'
});

export default App