/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppNavigation from '@navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

import {Toast} from '@components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {getListData} from '@store/selectors/note';
import NetInfo from '@react-native-community/netinfo';
import {noteActions} from '@store/reducers';

const MainLayout = () => {
  // this useEffect use for task 2
  // data store on persist  sync with async-storage
  const dataNeedToSync = useSelector(getListData); // get data from persist
  const dispatch = useDispatch();
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      // setIsConnected(state.isConnected);
      console.log(state, dataNeedToSync);
      if (state.isConnected && dataNeedToSync.length > 0) {
        // call api to sync with server
        console.log('call api to sync with server');
        // after call api success - clear data on persist
        dispatch(noteActions.onClearData());
      }
    });
    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <AppNavigation />
      <Toast />
    </GestureHandlerRootView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
