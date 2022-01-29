import type { TIngredientsActions } from '../actions/ingredients';
import { TIngredient } from '../../utils/types';

import {
    LOAD_INGREDIENTS_SUCCESS,
    LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_ERROR,
} from '../constants/ingredients';

type TIngredientsState = {
    allIngredients: Array<TIngredient>,
    isLoading: boolean
}

export const initialState: TIngredientsState = {
    allIngredients: [],
    isLoading: false
};

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case LOAD_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
         case LOAD_INGREDIENTS_SUCCESS:
             return {
                 ...state,
                 allIngredients: action.ingredients,
                 isLoading: false
             }
        case LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                allIngredients: [],
                isLoading: false
            }
        default: return state;
    }
}


