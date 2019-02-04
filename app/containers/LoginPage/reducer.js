import { fromJS } from 'immutable';

import { USER, ERROR } from './constants';

// The initial state of the App
export const initialState = fromJS({
  loginResult: {},
  error: {}
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER:
      console.log('reducer', action);
      return state.set('loginResult', action.result);
    case ERROR:
        return state.set('error', action.error);
    default:
      return state;
  }
}

export default loginReducer;
