/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setError, setSuccess } from 'containers/App/actions';

// import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { NEW_PROMOTION } from './constants';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import request from 'utils/request';
import urls from 'utils/urls';

export function* requestApi(action) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  console.log('coming in saga', action);
  const { state, token } = action;
  const requestURL = urls.baseUrl + urls.addNewLocation;
  const uploadImages = urls.baseUrl + urls.uploadImages;
  
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
    const imagesOptions = {
      method: 'POST',
      body: state.images,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    // console.log('in try', imagesOptions);
    // const images = yield call(request, uploadImages);
    // console.log('images', images);
    const user = yield call(request, requestURL, options);
    console.log('userrr', user);
    yield put(setSuccess(user));
  } catch (err) {
    console.log('coming in error', err);
    yield put(setError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callApi() {
  yield takeLatest(NEW_PROMOTION, requestApi);
}
