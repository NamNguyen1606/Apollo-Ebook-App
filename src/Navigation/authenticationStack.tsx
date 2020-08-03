import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, RegisterScreen, LoginScreen} from '../Screens';
import HomeTabNavigation from './homeTab';
import Route from '../Utils/router';
import {DetailBookScreen, SynopsisTab} from '../Screens/HomePage';
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.Welcome}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.Register}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.Login}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.HomePage}
        component={HomeTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.DetailBook}
        component={DetailBookScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={Route.SynopsisTab}
        component={SynopsisTab}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
