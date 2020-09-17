import {
    LOADING_POST,
    ERROR_REQUEST,
    SUCCESS_REQUEST,
} from '../actions/post';

export default (
    state = {
        data: [],
        loading: false,
        errorRequest: false
    },
    action
) => {
    switch (action.type) {
        case LOADING_POST:
            return {
                ...state,
                loading: true,
                data: []
            };
        case SUCCESS_REQUEST:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        case ERROR_REQUEST:
            return {
                ...state,
                loading: false,
                errorRequest: true,
                data: action.data,
            };
        default:
            return state;
    }
};
