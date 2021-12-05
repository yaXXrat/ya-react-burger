import {
//LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_SUCCESS,
//LOAD_INGREDIENTS_ERROR,
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT, LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_ERROR,
} from '../actions/ingredients';

export const initialState = {
    ingredientSelected: false,
    selectedIngredient: {},
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
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                ingredientSelected: true,
                selectedIngredient: {
                    ...state.allIngredients.find( item =>  item._id === action.id )
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


