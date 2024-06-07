import {put, takeLatest} from 'redux-saga/effects';
import {appActions} from '@store/reducers';
import {ITaskOneItem} from '@store/types';
import {BaseApiResponse} from '../../networking/config';
import {APIs, request} from '@networking';
type GetTaskOneDataResponse = BaseApiResponse<ITaskOneItem[]>;

function* getTaskOneData() {
  const result: GetTaskOneDataResponse = yield request({...APIs.GetPhoto});
  if (result?.data) {
    yield put(appActions.setTaskOneData(result.data));
  }
}

export default [takeLatest(appActions.getTaskOneData.type, getTaskOneData)];
