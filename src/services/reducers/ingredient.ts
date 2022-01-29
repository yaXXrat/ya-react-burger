import type { TIngredientActions } from '../actions/ingredient';
import { TIngredient } from '../../utils/types';

import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../constants/ingredient';

type TIngredientState = {
    selectedIngredient: TIngredient | undefined
  } 

export const initialState: TIngredientState = {
    selectedIngredient: undefined
};

export const burgerIngredientReducer = (state = initialState, action: TIngredientActions) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                selectedIngredient: {
                    ...action.ingredient
                }
            }
        case RESET_CURRENT_INGREDIENT:
            return {
                ...state,
                selectedIngredient: undefined
            }
        default: return state;
    }
}


