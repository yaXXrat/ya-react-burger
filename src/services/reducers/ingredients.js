import {
    LOAD_INGREDIENTS_SUCCESS,
    LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_ERROR,
} from '../actions/ingredients';

export const initialState = {
    allIngredients: [],
    isLoading: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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


