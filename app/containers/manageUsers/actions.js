import { DELETE_USER, GET_USERS_LIST, SAVE_USERS, SEARCH_USER, UPDATE_USER } from './constants';

export function getUsersList(token) {
    console.log('users action', token)
    return {
        type: GET_USERS_LIST,
        token
    }
}

export function saveUsersToReducer(users) {
    return {
        type: SAVE_USERS,
        users
    }
}

export function searchUserAction(text, token) {
    return {
        type: SEARCH_USER,
        text,
        token
    }
}

export function updateUser(id, update) {
    return {
        type: UPDATE_USER,
        id,
        update
    }
}

export function deleteUser(id) {
    return {
        type: DELETE_USER,
        id
    }
}