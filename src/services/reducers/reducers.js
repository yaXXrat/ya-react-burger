import {
LOAD_INGREDIENTS,
LOAD_INGREDIENTS_SUCCESS,
LOAD_INGREDIENTS_FAILED ,
MAKE_ORDER ,
MAKE_ORDER_SUCCESS,
MAKE_ORDER_FAILED,
SET_CURRENT_INGREDIENT
} from '../actions/actions.js';
import {combineReducers} from "redux";

export const initialState = {
    orderInitialState: {},
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


