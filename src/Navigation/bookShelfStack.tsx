import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Route from '../Utils/router';
import {BookShelfScreen} from '../Screens/HomePage';

const Stack = createStackNavigator();
const BookSelfStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Route.BookSelf} component={BookShelfScreen} />
    </Stack.Navigator>
  );
};
export default BookSelfStack;
