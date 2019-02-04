/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
// import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { USER, LOGIN } from './constants';
import { setUser, setError } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import urls from 'utils/urls';

export function* login(action) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const { email, password } = action;
  const requestURL = urls.baseUrl + urls.login;
  console.log('coming in saga', email, password);

  try {
    // Call our request helper (see 'utils/request')
    const options = {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        "Content-Type": "application/json"
      },
    }
    const user = yield call(request, requestURL, options);
    yield put(setUser(user));
  } catch (err) {
    yield put(setError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls login when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  console.log('coming in sagaga');
  yield takeLatest(LOGIN, login);
}
