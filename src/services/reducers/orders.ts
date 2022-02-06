import { TOrdersActions } from '../actions/orders';
import { TIngredient } from '../types/types';

import { IServerOrder, TFeedOrder } from '../types/orders';

import {
    FETCH_ORDERS ,
    CLEAR_ORDERS,
    NEW_ORDERS_ARRIVE,
    LOAD_INGREDIENTS,
} from '../constants/orders';

export type TOrdersState = {
    isLoading: boolean,
    total: number,
    todayTotal: number,
    orders: TFeedOrder[],
    ingredientPrices: Map<string, number>
}

const initialState: TOrdersState = {
    isLoading: false,
    total: 0,
    todayTotal: 0,
    orders: [],
    ingredientPrices: new Map()
};

export const ordersReducer = (state:TOrdersState = initialState, action: TOrdersActions) => {
    switch (action.type) {
        case LOAD_INGREDIENTS:
            let ingredientPrices: Map<string, number> = new Map();
            let ingredients: ReadonlyArray<TIngredient> = action.ingredients;
            ingredients.forEach((ingredient: TIngredient) => {
                ingredientPrices.set(ingredient._id, ingredient.price);

            })
            return { ...state,
                ingredientPrices: ingredientPrices
            }
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
            const newOrders: TFeedOrder[] = [];
            data.orders.slice(0,20).forEach((order: IServerOrder) => {
//                const hasOrder = state.orders.some(stateOrder => {
//                    return stateOrder._id === order._id
//                });

//                if (hasOrder){
                //     let stateOrder = state.orders.find(stOrder => stOrder.id === order.number)
                //     if (stateOrder && stateOrder.status !== order.status){
                //         stateOrder.status = order.status;
                //         newOrders.push(stateOrder);
                //     }
                // } else {
                    let ingredientsIds: ReadonlyArray<string> = order.ingredients;
                    let ingredientPrices: Map<string,number> = state.ingredientPrices;
                    let total: number = 0;
                    ingredientsIds.forEach((id: string) =>{
                        let ingredientPrice: number | undefined = ingredientPrices.get(id);
                        total += ( typeof ingredientPrice == 'undefined') ? 0 : ingredientPrice;
                    })
                    newOrders.push({
                        id: order.number,
                        _id: order._id,
                        fullname: order.name,
                        status: order.status,
                        createdAt: order.createdAt,
                        ingredients: ingredientsIds,
                        total: total
                    });
                // }

            });
            return {...state, orders: newOrders, total: data.total, todayTotal: data.totalToday, isLoading: false};
        case CLEAR_ORDERS:
            return {...state, orders: [], total: 0, todayTotal: 0};
        default:
            return state;    
    }
}
