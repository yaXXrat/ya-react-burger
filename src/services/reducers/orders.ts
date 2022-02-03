import { TOrders } from '../types/orders';
import { TOrdersActions } from '../actions/orders';
import {
    UPDATE_ORDERS_TOTALS,    
    FETCH_ORDERS ,
    CLEAR_ORDERS,
    NEW_ORDERS_ARRIVE,
} from '../constants/orders';

type TOrdersState = {
    total: number,
    todayTotal: number,
    orders: TOrders
}

const initialState: TOrdersState = {
    total: 0,
    todayTotal: 0,
    orders: []
};

export const ordersReducer = (state:TOrdersState = initialState, action: TOrdersActions) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {
                ...state
            };
        case NEW_ORDERS_ARRIVE:
            console.log('NEW_ORDERS_ARRIVE')
            return state;    
        case UPDATE_ORDERS_TOTALS:
            console.log('UPDATE_ORDERS_TOTALS')
            return state;    
        //     return {
        //         ...state,
        //         total: action.total,
        //         todayTotal: action.todayTotal
        // };
        case CLEAR_ORDERS:
            return {...initialState};
        default:
            return state;    
    }
}