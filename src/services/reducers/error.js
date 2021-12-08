import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from '../actions/error';

export const initialState = {
    errorMessage: ''
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case RESET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: ''
            }
        default: return state;
    }
}


