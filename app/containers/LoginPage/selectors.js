/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogi = state => state.get('login', initialState);
// const selectLogin = state => state.get('login', initialState);

const selectLogin = () =>
  createSelector(
    selectLogi,
    loginState => loginState.get('loginResult'),
  )

// const selectCurrentUser = () =>
//     createSelector(
//       selectLogin,
//       userState => userState.get('user'),
//     )


export { selectLogin };
