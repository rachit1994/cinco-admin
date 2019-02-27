/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setError, setSuccess } from 'containers/App/actions';

import { UPLOAD_MULTIPLE } from './constants';
import request from 'utils/request';
import { selectLogin } from 'containers/LoginPage/selectors';
import urls from 'utils/urls';

export function* uploadExcel(action) {
  const { arr } = action;
  const state = yield select(selectLogin());
  const token = state.token;
  console.log('tokennnnnn', token);
  const requestURL = urls.baseUrl + urls.uploadMultiple;

  try {
    if(!token.tokenType) {
      yield put(setError({message: 'no token, please login'}));
    }
    // Call our request helper (see 'utils/request')
    const options = {
      method: 'POST',
      body: JSON.stringify({insert: arr}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token.tokenType} ${token.accessToken}`
      },
    }
    const companies = yield call(request, requestURL, options);
    console.log('companies', companies);
    yield put(setSuccess(companies));
  } catch (err) {
    yield put(setError({message: 'error'}));
  }
}

export default function* upload() {
  yield takeLatest(UPLOAD_MULTIPLE, uploadExcel);
}
