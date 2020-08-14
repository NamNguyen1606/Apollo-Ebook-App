import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from '../Utils/router';
import {BookShelfScreen} from '../Screens/HomePage';
import DetailBookScreen from '../Screens/HomePage/DetailBook/index';

const Stack = createStackNavigator();
const BookSelfStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={Route.BookSelf}
        component={BookShelfScreen}
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
export default BookSelfStack;
