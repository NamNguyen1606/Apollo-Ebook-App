import React from 'react';
import Route from '../Utils/router';
import {
  ListBookScreen,
  DiscoverScreen,
  DetailBookScreen,
} from '../Screens/HomePage';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
const DiscoverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
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
