import {
    ERASE_ORDER,    
    MAKE_ORDER_SUCCESS,
    REMOVE_ORDER_INGREDIENT,
//    SET_ORDER_INGREDIENTS,
    SET_ORDER_INGREDIENT,
//    MAKE_ORDER ,
//    MAKE_ORDER_SUCCESS,
//    MAKE_ORDER_FAILED,
} from '../actions/orderActions';

export const initialState = {
    orderCreated: false,
    orderIngredients: [],
    currentOrder:{
        number: 0,
        success: true,
        name: "",
        ingredients: [],
        price: 0
      }
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_INGREDIENT: 
            return { 
                ...state,
                orderIngredients: [
                    ...state.orderIngredients,
                    action.ingredient
                ]
            }
        case REMOVE_ORDER_INGREDIENT:
            const newIngredients = [...state.orderIngredients];
            let idx = newIngredients.indexOf(action.ingredient);
            newIngredients.splice(idx, 1);            
            return {
                ...state,
                orderIngredients: newIngredients
            }
        case MAKE_ORDER_SUCCESS:
            return {
                ...state,
                orderCreated: true,
                currentOrder: {
                    ...state.currentOrder,
                    ...action.order
                }
            }
        case ERASE_ORDER:
            return {
                ...state,
                orderCreated: false,
                orderIngredients: [],
                currentOrder: {}
            }
        default: return state;
    }
}


