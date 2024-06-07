import {combineReducers} from '@reduxjs/toolkit';

// Reducer Imports
import {persistReducer} from 'redux-persist';
import INITIAL_STATE from '../initialState';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import reducer
import app, {appInitialState} from './app';
import note, {noteInitialState} from './note';

// Reducer Export
export * from './app';
export * from './note';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: Object.keys(INITIAL_STATE),
};

const notePersistConfig = {
  key: 'note',
  storage: AsyncStorage,
};

export const InitialState = {
  app: appInitialState,
  note: noteInitialState,
};

export default combineReducers({
  app,
  note: persistReducer(notePersistConfig, note),
});
