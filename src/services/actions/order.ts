import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, ERASE_ORDER } from "../constants/order";
import { TOrder } from '../../utils/types';

export interface IMakeOrderRequestAction {
    readonly type: typeof MAKE_ORDER_REQUEST;
}
export interface IMakeOrderRequestSuccessAction {
    readonly type: typeof MAKE_ORDER_SUCCESS;
    readonly order: TOrder;
}
export interface IMakeOrderRequestErrorAction {
    readonly type: typeof MAKE_ORDER_ERROR;
}
export interface IEraseOrderAction {
    readonly type: typeof ERASE_ORDER;
}

export type TOrderActions = 
    | IMakeOrderRequestAction
    | IMakeOrderRequestSuccessAction
    | IMakeOrderRequestErrorAction
    | IEraseOrderAction;

export const makeOrderRequest = (): TOrderActions => ({
        type: MAKE_ORDER_REQUEST
});    
export const makeOrderRequestSuccess = (order: TOrder): TOrderActions => ({
        type: MAKE_ORDER_SUCCESS,
        order
});    
export const makeOrderRequestError = (): TOrderActions => ({
    type: MAKE_ORDER_ERROR
});    
export const eraseOrder = (): TOrderActions => ({
    type: ERASE_ORDER
});    
