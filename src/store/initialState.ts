import {IInitialState} from './types';

const INITIAL_STATE: IInitialState = {
  app: {
    taskOne: {
      data: [],
    },
  },
  note: {
    dataRequireSync: [],
  },
};

export default INITIAL_STATE;
