import {ParamListBase} from '@react-navigation/native';
import RouteKey from './RouteKey';
import {NoteItem} from '@services/db';
export type KeyAppScreen = keyof typeof RouteKey;
/** Type */

type CreateNoteScreen = {
  type: 'add' | 'edit';
  item?: NoteItem;
};
export interface AppStackParamList extends ParamListBase {
  /** Params */
  [RouteKey.CreateNoteScreen]: CreateNoteScreen;
}

export interface MainTabParamList extends ParamListBase {
  /** Params */
}
