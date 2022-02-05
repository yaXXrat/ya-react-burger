import { FETCH_ORDERS, CLEAR_ORDERS, NEW_ORDERS_ARRIVE, LOAD_INGREDIENTS } from '../constants/orders';
import { IServerOrderReply } from '../types/orders';
import { TIngredient } from "../types/types";

export interface ILoadIngredientsAction {
    readonly type: typeof LOAD_INGREDIENTS;
    ingredients: ReadonlyArray<TIngredient>
}
export interface IFetchOrdersAction {
    readonly type: typeof FETCH_ORDERS;
}
export interface IClearOrdersAction {
    readonly type: typeof CLEAR_ORDERS;
}
export interface INewOrderArriveAction {
    readonly type: typeof NEW_ORDERS_ARRIVE;
    payload: IServerOrderReply;
}

export type TOrdersActions = 
    | IFetchOrdersAction
    | ILoadIngredientsAction
    | IClearOrdersAction
    | INewOrderArriveAction;

export const fetchOrders = (): TOrdersActions => ({
        type: FETCH_ORDERS
});    
export const loadIngredients = (ingredients: Array<TIngredient>): ILoadIngredientsAction => ({
    type: LOAD_INGREDIENTS,
    ingredients
});    
export const newOrdersArrive = (payload: IServerOrderReply): TOrdersActions => ({
        type: NEW_ORDERS_ARRIVE,
        payload
});    
export const clearOrders = (): TOrdersActions => ({
    type: CLEAR_ORDERS
});    
