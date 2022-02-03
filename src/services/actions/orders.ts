import { FETCH_ORDERS, CLEAR_ORDERS, NEW_ORDERS_ARRIVE, UPDATE_ORDERS_TOTALS } from '../constants/orders';
import { IServerOrderReply } from '../types/orders';

export interface IUpdateOrdersTotalAction {
    readonly type: typeof UPDATE_ORDERS_TOTALS;
    total: number;
    todayTotal: number;
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
    | IUpdateOrdersTotalAction
    | IClearOrdersAction
    | INewOrderArriveAction;

export const updateOrdersTotal = (total: number, todayTotal: number): TOrdersActions => ({
    type: UPDATE_ORDERS_TOTALS,
    total,
    todayTotal

})    
export const fetchOrders = (): TOrdersActions => ({
        type: FETCH_ORDERS
});    
export const newOrdersArrive = (payload: IServerOrderReply): TOrdersActions => ({
        type: NEW_ORDERS_ARRIVE,
        payload
});    
export const clearOrders = (): TOrdersActions => ({
    type: CLEAR_ORDERS
});    
