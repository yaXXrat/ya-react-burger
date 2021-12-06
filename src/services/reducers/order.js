import {
    ERASE_ORDER,    
    REMOVE_ORDER_INGREDIENT,
    SET_ORDER_INGREDIENT,
    MAKE_ORDER_REQUEST ,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_ERROR,
    UPDATE_ORDER,
} from '../actions/order';

export const initialState = {
    orderCreated: false,
    orderBunSelected: false,
    lastIndex: 0,
    orderBun: {},
    orderIngredients: [],
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
        case SET_ORDER_INGREDIENT:
            let newState = undefined;
            if(action.ingredient.type === "bun") {
                newState = {
                    ...state,
                    orderBunSelected: true,
                    orderBun: action.ingredient
                }
            } else {
                let newIngredient = {...action.ingredient};
                let tmpIndex = state.lastIndex + 1;
                newIngredient.id = tmpIndex;
                newState = {
                    ...state,
                    lastIndex: tmpIndex,
                    orderIngredients: [
                        ...state.orderIngredients,
                        newIngredient
                    ]
                }
            }
            return newState;
        case REMOVE_ORDER_INGREDIENT:
            const newIngredients = [...state.orderIngredients];
            let idx = newIngredients.indexOf(action.ingredient);
            newIngredients.splice(idx, 1);            
            return {
                ...state,
                orderIngredients: newIngredients
            }
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
        case UPDATE_ORDER:
            let temp = [...state.orderIngredients];
            [temp[action.dragIndex], temp[action.hoverIndex]] = [ temp[action.hoverIndex], temp[action.dragIndex]];
            return {
                ...state,
                orderIngredients: [...temp]
            }
        default: return state;
    }
}


