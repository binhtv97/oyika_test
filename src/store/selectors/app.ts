import {IApp, IInitialState, ITaskOneItem} from '../types';

export const getAppState = (state: IInitialState): IApp => state.app;
export const getTaskOneData = (state: IInitialState): ITaskOneItem[] =>
  state.app.taskOne.data;
