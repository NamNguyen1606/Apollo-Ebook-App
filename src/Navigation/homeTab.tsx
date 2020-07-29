import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {
  BookshelfScreen,
  SearchScreen,
  ProfileScreen,
} from '../Screens/HomePage';
import DiscoverStack from './discoverStack';
import Route from '../Utils/router';
interface props {
  route: any;
}
const Tab = createBottomTabNavigator();
export const BookDataContext = React.createContext();
const HomeTabNavigation: React.FC<props> = (props) => {
  const {newBookData, bestSellerData} = props.route.params;
  return (
    <BookDataContext.Provider
      value={{newBook: newBookData, bestSellerBook: bestSellerData}}>
      <Tab.Navigator
        tabBarOptions={{showLabel: false, tabStyle: {marginBottom: 10}}}>
        <Tab.Screen
          name="Discover"
          component={DiscoverStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="explore" type="material" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon
                name="search"
                type="font-awesome"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Book Self"
          component={BookshelfScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="book" type="material" size={size} color={color} />
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
    </BookDataContext.Provider>
  );
};

export default HomeTabNavigation;
