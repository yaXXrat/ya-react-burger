import type { TErrorActions } from '../actions/error';

import { 
    SET_ERROR_MESSAGE,
    RESET_ERROR_MESSAGE
} from '../constants/error';

type TErrorState = {
    errorMessage: string
  } 

export const initialState: TErrorState = {
    errorMessage: ''
};

export const errorReducer = (state = initialState, action: TErrorActions) => {
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


