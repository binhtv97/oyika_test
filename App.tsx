/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {persistor, store} from '@store/store';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainLayout from './src/MainLayout';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainLayout />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
