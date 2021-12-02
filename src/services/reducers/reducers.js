import {
//LOAD_INGREDIENTS,
LOAD_INGREDIENTS_SUCCESS,
//LOAD_INGREDIENTS_FAILED ,
SET_CURRENT_INGREDIENT
} from '../actions/actions.js';

export const initialState = {
    selectedIngredient: {},
    allIngredients: []
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
                selectedIngredient: {
                    ...state.selectedIngredient,
                    ...state.allIngredients.find( item =>  item._id === action.id )
                }
            }
        default: return state;
    }
}


