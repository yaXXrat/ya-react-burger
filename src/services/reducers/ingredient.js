import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../actions/ingredient';

export const initialState = {
    ingredientSelected: false,
    selectedIngredient: {}
};

export const burgerIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                ingredientSelected: true,
                selectedIngredient: {
                    ...action.ingredient
                }
            }
        case RESET_CURRENT_INGREDIENT:
            return {
                ...state,
                ingredientSelected: false,
                selectedIngredient: {}
            }
        default: return state;
    }
}


