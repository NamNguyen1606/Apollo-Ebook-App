import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from '../Utils/router';
import {PacketScreen} from '../Screens/HomePage';
import DetailBookScreen from '../Screens/HomePage/DetailBook/index';

const Stack = createStackNavigator();

const PacketStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={Route.Packet}
        component={PacketScreen}
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
export default PacketStack;
