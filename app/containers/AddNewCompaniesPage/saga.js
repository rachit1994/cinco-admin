/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setError, setSuccess } from 'containers/App/actions';

// import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { NEW_COMPANY } from './constants';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import request from 'utils/request';
import urls from 'utils/urls';

export function* requestApi(action) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  console.log('coming in saga', action);
  const { state, token } = action;
  const requestURL = urls.baseUrl + urls.addNewLocation;

  try {
    if(!token.tokenType) {
        yield put(setError({message: 'no token, please login'}));
    }
    // Call our request helper (see 'utils/request')
    const options = {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token.tokenType} ${token.accessToken}`
      },
    }
    const user = yield call(request, requestURL, options);
    yield put(setSuccess(user));
  } catch (err) {
    yield put(setError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callApi() {
  yield takeLatest(NEW_COMPANY, requestApi);
}
