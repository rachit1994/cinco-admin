import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCompaniesInitial = state => state.get('multiImages', initialState);

const makeSelectCompanies = () =>
  createSelector(
    selectCompaniesInitial,
    state => state.get('companies'),
  );

export { selectCompaniesInitial, makeSelectCompanies };
