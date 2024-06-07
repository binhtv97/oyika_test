import {NoteItem} from '@services/db';
import {IInitialState, ITaskTwo} from '@store/types';

export const getAppState = (state: IInitialState): ITaskTwo => state.note;
export const getListData = (state: IInitialState): NoteItem[] =>
  state.note.dataRequireSync;
