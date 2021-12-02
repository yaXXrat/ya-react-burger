import {
    MAKE_ORDER_SUCCESS,
//    SET_ORDER_INGREDIENTS,
    SET_ORDER_INGREDIENT,
//    MAKE_ORDER ,
//    MAKE_ORDER_SUCCESS,
//    MAKE_ORDER_FAILED,
} from '../actions/orderActions';

export const initialState = {
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
        case MAKE_ORDER_SUCCESS:
            return{
                ...state,
                currentOrder: {
                    ...state.currentOrder,
                    ...action.order
                }
            }
        default: return state;
    }
}


