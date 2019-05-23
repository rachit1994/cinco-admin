import { GET_ALL_COMPANIES, COMPANIES } from './constants';

export function getAllCompanies(token) {
    return {
        type: GET_ALL_COMPANIES,
        token
    }
}

export function saveCompaniesToReducer(companies) {
    return {
        type: COMPANIES,
        companies
    }
}
