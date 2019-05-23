import { COMPANIES } from './constants';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  companies: [],
});

function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANIES:
      console.log('companies in reducer', action.companies);
      return state.set('companies', action.companies);
    default:
      return state;
  }
}

export default companiesReducer;
