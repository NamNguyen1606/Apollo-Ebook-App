import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, RegisterScreen, LoginScreen} from './src/Screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BookShelfScreen,
  DiscoverScreen,
  SearchScreen,
  ProfileScreen,
} from './src/Screens/HomePage';
import {Icon} from 'react-native-elements';
import BookShelfMoreScreen from './src/Screens/HomePage/BookShelfMore/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false, tabStyle: {marginBottom: 10}}}>
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="explore" type="material" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Book Self"
        component={BookShelfNavigation}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="book" type="material" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" type="font-awesome" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" type="font-awesome" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const BookShelfNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookShelf"
        component={BookShelfScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookShelf_More"
        component={BookShelfMoreScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome_screen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="register_screen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login_screen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomePage"
        component={HomeTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookShelf_More"
        component={BookShelfMoreScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
