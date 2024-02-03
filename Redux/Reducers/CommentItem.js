import {
    ADD_COMMENTS
} from '../constants';

const commentItems = (state = [], actions) => {
    switch (actions.type) {
        case ADD_COMMENTS:
            return [...state, actions.payload]
    }
    return state;
}

export default commentItems;