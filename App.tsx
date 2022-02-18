import React from 'react';
import qs from 'qs';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
