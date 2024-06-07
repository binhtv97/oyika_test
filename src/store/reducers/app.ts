import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IApp, ITaskOneItem} from '../types';

export const appInitialState: IApp = {
  taskOne: {
    data: [],
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    getTaskOneData: () => {},
    setTaskOneData: (state, action: PayloadAction<ITaskOneItem[]>) => {
      state.taskOne.data = action.payload;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
