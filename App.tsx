import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './src/Navigation/authenticationStack';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default App;
