import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, ERASE_ORDER, SET_ORDER_INGREDIENT, REMOVE_ORDER_INGREDIENT } from "../constants/order";
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
export interface ISetOrderIngredientAction {
    readonly type: typeof SET_ORDER_INGREDIENT;
}
export interface IRemoveOrderIngredientAction {
    readonly type: typeof REMOVE_ORDER_INGREDIENT;
}

export type TOrderActions = 
    | IMakeOrderRequestAction
    | IMakeOrderRequestSuccessAction
    | IMakeOrderRequestErrorAction
    | IEraseOrderAction
    | ISetOrderIngredientAction
    | IRemoveOrderIngredientAction;

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
export const setOrderIngredient = (): TOrderActions => ({
    type: SET_ORDER_INGREDIENT
});    
export const removeOrderIngredient = (): TOrderActions => ({
    type: REMOVE_ORDER_INGREDIENT
});    
            

