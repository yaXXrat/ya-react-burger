import {
//LOAD_INGREDIENTS,
LOAD_INGREDIENTS_SUCCESS,
//LOAD_INGREDIENTS_FAILED ,
SET_CURRENT_INGREDIENT,
RESET_CURRENT_INGREDIENT,
} from '../actions/ingredients';

export const initialState = {
    ingredientSelected: false,
    selectedIngredient: {},
    allIngredients: [],
    errorMessage: ''
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
         case LOAD_INGREDIENTS_SUCCESS:
             return {
                 ...state,
                 allIngredients: [
                     ...state.allIngredients,
                     ...action.ingredients
                 ]
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


