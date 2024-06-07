// Import Type
import {IApp, ITaskTwo} from './app';

export interface IInitialState {
  app: IApp;
  note: ITaskTwo;
}

export interface IError {
  code: number;
  message: string;
}
