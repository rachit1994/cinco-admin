import { UPLOAD_MULTIPLE } from './constants';

export function uploadCompanies(arr) {
    return {
        type: UPLOAD_MULTIPLE,
        arr
    }
}