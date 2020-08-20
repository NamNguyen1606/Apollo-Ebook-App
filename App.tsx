import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './src/Navigation/authenticationStack';
import StoreProvider from './src/Utils/StoreProvider';

enableScreens();
const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
