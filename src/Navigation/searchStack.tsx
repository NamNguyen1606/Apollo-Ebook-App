import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from '../Utils/router';
import DetailBookScreen from '../Screens/HomePage/DetailBook/index';
import CategoryResultScreen from '../Screens/HomePage/SearchResult/index';
import SearchScreen from '../Screens/HomePage/Search/index';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={Route.SearchTab}
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Route.SearchResult}
        component={CategoryResultScreen}
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

export default SearchStack;
