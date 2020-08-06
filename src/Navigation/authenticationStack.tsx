import React from 'react';
import {WelcomeScreen, RegisterScreen, LoginScreen} from '../Screens';
import HomeTabNavigation from './homeTab';
import Route from '../Utils/router';
import {
  DetailBookScreen,
  SynopsisTab,
  DetailPacketScreen,
} from '../Screens/HomePage';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{animationTypeForReplace: 'pop'}}>
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
        sharedElementsConfig={(route) => {
          const {book} = route.params;
          return [`item.${book.id}.photo`, `item.${book.id}.text`];
        }}
      />
      <Stack.Screen
        name={Route.SynopsisTab}
        component={SynopsisTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.DetailPacket}
        component={DetailPacketScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
