import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserInitial = state => state.get('users', initialState);

const makeSelectUsers = () =>
  createSelector(
    selectUserInitial,
    state => state.get('users'),
  );

export { selectUserInitial, makeSelectUsers };
