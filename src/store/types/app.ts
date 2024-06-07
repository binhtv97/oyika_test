import {NoteItem} from '@services/db';

export interface IApp {
  taskOne: ITaskOne;
}

export interface ITaskOne {
  data: ITaskOneItem[];
}

export interface ITaskOneItem {
  id: string;
  title: string;
  url: string;
}

export interface ITaskTwo {
  dataRequireSync: NoteItem[];
}
