import {
    LOAD_INGREDIENTS_SUCCESS,
    LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_ERROR,
} from '../actions/ingredients';

export const initialState = {
    allIngredients: [],
    errorMessage: '',
    isError: false,
    isLoading: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
         case LOAD_INGREDIENTS_SUCCESS:
             return {
                 ...state,
                 allIngredients: [
                     ...state.allIngredients,
                     ...action.ingredients
                 ],
                 isLoading: false,
                 isError: false
             }
        case LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                allIngredients: [
                    ...state.allIngredients,
                    ...action.ingredients
                ],
                isLoading: false,
                isError: true
            }
        default: return state;
    }
}


