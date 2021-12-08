import {
    ERASE_ORDER,    
    MAKE_ORDER_REQUEST ,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_ERROR,
} from '../actions/order';

export const initialState = {
    orderCreated: false,
    currentOrder:{
        number: 0,
        success: true,
        name: "",
        ingredients: [],
        price: 0
      },
    isLoading: false
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case MAKE_ORDER_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case MAKE_ORDER_SUCCESS:
            return {
                ...state,
                orderCreated: true,
                currentOrder: {
                    ...state.currentOrder,
                    ...action.order
                },
                isLoading: false
            }
        case ERASE_ORDER:
            return {
                ...initialState
            }
        default: return state;
    }
}


