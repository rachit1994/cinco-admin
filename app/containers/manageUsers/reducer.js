import { SAVE_USERS } from './constants';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  users: [],
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USERS:
      return state.set('users', action.users);
    default:
      return state;
  }
}

export default userReducer;
