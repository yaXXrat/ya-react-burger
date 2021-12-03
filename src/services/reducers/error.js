import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from '../actions/error';

export const initialState = {
    isError: false,
    errorMessage: ''
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                isError: true,
                errorMessage: action.errorMessage
            }
        case RESET_ERROR_MESSAGE:
            return {
                ...state,
                isError: false,
                errorMessage: ''
            }
        default: return state;
    }
}


