import { fromJS } from 'immutable';
import { NEW_PROMOTION } from './constants';

export const initialState = fromJS({
  promotions: [],
});

function promotionsReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PROMOTION:
      console.log('promotions in reducer', action.promotions);
      return state.set('promotions', action.promotions);
    default:
      return state;
  }
}

export default promotionsReducer;
