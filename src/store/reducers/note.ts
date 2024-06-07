import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ITaskTwo} from '../types';
import {NoteItem} from '@services/db';

export const noteInitialState: ITaskTwo = {
  dataRequireSync: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState: noteInitialState,
  reducers: {
    onClearData: state => {
      state.dataRequireSync = [];
    },
    onAddData: (state, action: PayloadAction<NoteItem>) => {
      state.dataRequireSync.push(action.payload);
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
