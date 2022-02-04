import { TOrdersActions } from '../actions/orders';

import { IServerOrder, TOrder } from '../types/orders';

import {
    UPDATE_ORDERS_TOTALS,    
    FETCH_ORDERS ,
    CLEAR_ORDERS,
    NEW_ORDERS_ARRIVE,
} from '../constants/orders';

type TOrdersState = {
    isLoading: boolean,
    total: number,
    todayTotal: number,
    orders: TOrder[]
}

const initialState: TOrdersState = {
    isLoading: false,
    total: 0,
    todayTotal: 0,
    orders: []
};

export const ordersReducer = (state:TOrdersState = initialState, action: TOrdersActions) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {
                ...state,
                isLoading: true
            };
        case NEW_ORDERS_ARRIVE:
            const data = action.payload as {
                orders: IServerOrder[],
                total: number,
                totalToday: number
            };

            const newOrders: TOrder[] = [];

            data.orders.forEach((order: IServerOrder) => {
                const hasOrder = state.orders.some(stateOrder => {
                    return stateOrder.id === order.number
                });

                if (hasOrder){
                    let stateOrder = state.orders.find(stOrder => stOrder.id === order.number)
                    if (stateOrder && stateOrder.status !== order.status){
                        stateOrder.status = order.status;
                        newOrders.push(stateOrder);
                    }
                } else {
                    newOrders.push({
                        id: order.number,
                        fullname: order.name,
                        status: order.status,
                        createdAt: order.createdAt,
                        ingredientIds: order.ingredients
                    });
                }

            });
            return {...state, orders: [...state.orders, ...newOrders], total: data.total, todayTotal: data.totalToday, isLoading: false};
        case UPDATE_ORDERS_TOTALS:
             return {
                 ...state,
                 total: action.total,
                 todayTotal: action.todayTotal,
                 isLoading: false
         };
        case CLEAR_ORDERS:
            return {...initialState};
        default:
            return state;    
    }
}