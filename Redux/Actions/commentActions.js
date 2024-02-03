import {
    ADD_COMMENTS
} from '../constants';

export const addComments = (payload) => {
    return {
        type: ADD_COMMENTS,
        payload
    }
}