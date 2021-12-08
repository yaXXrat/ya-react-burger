import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../actions/ingredient';

export const initialState = {
    selectedIngredient: undefined
};

export const burgerIngredientReducer = (state = initialState, action) => {
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


