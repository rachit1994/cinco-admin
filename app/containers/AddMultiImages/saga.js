import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { repoLoadingError, reposLoaded } from 'containers/App/actions';
import { setError, setSuccess } from 'containers/App/actions';
import request from 'utils/request';
import urls from 'utils/urls';
import { saveCompaniesToReducer } from './actions';
import { GET_ALL_COMPANIES } from './constants';

export function* getAllCompanies(action) {
    const { token } = action;
    console.log('coming in saga', token);
    const requestURL = urls.baseUrl + urls.getAllCompanies;
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
              };
            // Call our request helper (see 'utils/request')
            const companies = yield call(request, requestURL, options);
            const changed = [];
            companies.forEach(element => {
                element.label = element.title;
                element.id = element._id;
                changed.push(element);
            });
            yield put(saveCompaniesToReducer(changed));
        }
    } catch (err) {
        console.log('users saga error', err);
        yield put(repoLoadingError(err));
    }
}

export default function* getData() {
    yield takeLatest(GET_ALL_COMPANIES, getAllCompanies)
}