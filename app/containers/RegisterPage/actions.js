import { USER, LOGIN, ERROR } from './constants';

export function setUser(result) {
    return {
        type: USER,
        result
    };
}

export function setError(err) {
    return {
        type: ERROR,
        err
    }
}

export function login(email, password) {
    console.log('coming in actions', email, password);
    return {
        type: LOGIN,
        email,
        password
    };
}

