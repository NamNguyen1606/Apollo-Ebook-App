import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Route from '../Utils/router';
import {
  ListBookScreen,
  DiscoverScreen,
  DetailBookScreen,
} from '../Screens/HomePage';

const Stack = createStackNavigator();
const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.Discover}
        component={DiscoverScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.ListBook}
        component={ListBookScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.DetailBook}
        component={DetailBookScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default DiscoverStack;
