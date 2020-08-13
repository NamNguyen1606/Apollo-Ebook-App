import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {
  BookshelfScreen,
  SearchScreen,
  ProfileScreen,
} from '../Screens/HomePage';
import DiscoverStack from './discoverStack';
interface props {
  route: any;
}
const Tab = createBottomTabNavigator();
export const DataContext = React.createContext({});
const HomeTabNavigation: React.FC<props> = (props) => {
  const {newBookData, bestSellerData, categoryData} = props.route.params;
  return (
    <DataContext.Provider
      value={{
        newBook: newBookData,
        bestSellerBook: bestSellerData,
        categoryData: categoryData,
      }}>
      <Tab.Navigator
        tabBarOptions={{showLabel: true, tabStyle: {marginBottom: 10}}}>
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
          name="Packet"
          component={BookshelfScreen}
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
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" type="font-awesome" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </DataContext.Provider>
  );
};

export default React.memo(HomeTabNavigation);
