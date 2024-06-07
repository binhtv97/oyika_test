import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from './RootNavigation';
import {MainNavigator} from './StackNavigation';

function AppNavigation(): React.ReactElement {
  function renderStack(): React.ReactNode {
    return <MainNavigator />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {renderStack()}
    </NavigationContainer>
  );
}

export default AppNavigation;
