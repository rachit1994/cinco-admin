import { NEW_PROMOTION } from './constants';

export function addNewPromotion(state, token) {
    return {
        type: NEW_PROMOTION,
        state,
        token
    }
}