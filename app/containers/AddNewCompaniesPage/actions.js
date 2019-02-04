import { NEW_COMPANY } from './constants';

export function createNewCompany(state, token) {
    console.log('coming in action', state, token);
    return {
        type: NEW_COMPANY,
        state,
        token
    }
}