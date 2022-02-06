import { LOAD_ORDER_FROM_SERVER_SUCCESS, LOAD_ORDER_FROM_SERVER, SET_ORDER_LOCAL  } from '../constants/server-order';
import { TFeedOrder } from "../types/orders";

export type TLoadOrderFromServerAction = {
    readonly type: typeof LOAD_ORDER_FROM_SERVER;
}

export type TLoadOrderFromServerSuccessAction = {
    readonly type: typeof LOAD_ORDER_FROM_SERVER_SUCCESS;
    payload: TFeedOrder;
}

export type TSetOrderLocalAction = {
    readonly type: typeof SET_ORDER_LOCAL;
    payload: TFeedOrder;
}

export type TLoadOrderFromServerActions = 
    | TSetOrderLocalAction
    | TLoadOrderFromServerAction
    | TLoadOrderFromServerSuccessAction;

export const loadOrderFromServer = (): TLoadOrderFromServerAction => ({
        type: LOAD_ORDER_FROM_SERVER
});    
export const loadOrderFromServerSuccess = (order: TFeedOrder): TLoadOrderFromServerSuccessAction => ({
    type: LOAD_ORDER_FROM_SERVER_SUCCESS,
    payload: order
});    
export const setOrderLocal = (order: TFeedOrder): TSetOrderLocalAction => ({
    type: SET_ORDER_LOCAL,
    payload: order
});    
