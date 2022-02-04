import { TOrdersActions } from '../actions/orders';

import { IServerOrder, TOrder } from '../types/orders';

import {
    UPDATE_ORDERS_TOTALS,    
    FETCH_ORDERS ,
    CLEAR_ORDERS,
    NEW_ORDERS_ARRIVE,
} from '../constants/orders';

type TOrdersState = {
    total: number,
    todayTotal: number,
    orders: TOrder[]
}

const initialState: TOrdersState = {
    total: 0,
    todayTotal: 0,
    orders: []
};

export const ordersReducer = (state:TOrdersState = initialState, action: TOrdersActions) => {
    switch (action.type) {
        case FETCH_ORDERS:
            console.log(' FETCH_ORDERS ');
            return {
                ...state
            };
        case NEW_ORDERS_ARRIVE:
            const data = action.payload as {
                orders: IServerOrder[],
                total: number,
                totalToday: number
            };

            const newOrders: TOrder[] = [];

            data.orders.forEach((order: IServerOrder) => {
                newOrders.push({
                    id: order.number,
                    fullname: order.name,
                    status: order.status,
                    createdAt: order.createdAt,
                    ingredientIds: order.ingredients
                });
            });

            return {...state, orders: [...state.orders, ...newOrders], total: data.total, todayTotal: data.totalToday};
        case UPDATE_ORDERS_TOTALS:
            return state;    
        //     return {
        //         ...state,
        //         total: action.total,
        //         todayTotal: action.todayTotal
        // };
        case CLEAR_ORDERS:
            console.log(' CLEAR_ORDERS ')
            return {...initialState};
        default:
            return state;    
    }
}