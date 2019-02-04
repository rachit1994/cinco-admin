import { fromJS } from 'immutable';

import { USER, ERROR } from './constants';

// The initial state of the App
export const initialState = fromJS({
  token: {},
  user: {},
  error: {}
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER:
      // Delete prefixed '@' from the github username
      state.set('token', action.result.token);
      state.set('user', action.result.user);
      return state;
    case ERROR:
        return state.set('error', action.error);
    default:
      return state;
  }
}

export default loginReducer;
