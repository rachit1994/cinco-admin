/**
 * Gets the repositories of the user from Github
 */

import { DELETE_USER, GET_USERS_LIST, SAVE_USERS, SEARCH_USER, UPDATE_USER } from './constants';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { repoLoadingError, reposLoaded } from 'containers/App/actions';
import { saveUsersToReducer, updateUser } from './actions';

import request from 'utils/request';
import { setError } from 'containers/App/actions';
import urls from 'utils/urls';

/**
 * Github repos request/response handler
 */
export function* getUsers(action) {
  // Select username from store
  const { token } = action;
  const requestURL = urls.baseUrl + urls.getUsersList;

  try {
    if (!token || (token && !token.tokenType)) {
      yield put(setError({ message: 'no token, please login' }));
    } else {
      // Call our request helper (see 'utils/request')
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token.tokenType} ${token.accessToken}`
        },
      }
      // Call our request helper (see 'utils/request')
      const users = yield call(request, requestURL, options);
      console.log('users saga', users);
      yield put(saveUsersToReducer(users));
    }

  } catch (err) {
    console.log('users saga error', err);
    yield put(repoLoadingError(err));
  }
}

export function* searchUser(action) {
  const { text, token } = action;
  const requestURL = urls.baseUrl + urls.searchUser;

  try {
    if (!token || (token && !token.tokenType)) {
      yield put(setError({ message: 'no token, please login' }));
    } else {
      // Call our request helper (see 'utils/request')
      const options = {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token.tokenType} ${token.accessToken}`
        },
      }
      // Call our request helper (see 'utils/request')
      const users = yield call(request, requestURL, options);
      console.log('users saga', users);
      yield put(saveUsersToReducer(users));
    }

  } catch (err) {
    console.log('error occurred', err);
    yield put(repoLoadingError(err));
  }
}

export function* updateUserSaga(action) {
  const { id, update } = action;
}

export function* deleteUserSaga(action) {

}

export default function* getData() {
  yield all(
    [
      takeLatest(GET_USERS_LIST, getUsers),
      takeEvery(SEARCH_USER, searchUser),
      takeEvery(UPDATE_USER, updateUserSaga),
      takeEvery(DELETE_USER, deleteUserSaga)
    ]
  );
}
