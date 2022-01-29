import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from '../constants/ingredients';
import { TIngredient } from '../../utils/types';

export interface ILoadIngredientsRequestAction {
    readonly type: typeof LOAD_INGREDIENTS_REQUEST;
}
export interface ILoadIngredientsRequestSuccessAction {
    readonly type: typeof LOAD_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>
}
export interface ILoadIngredientsRequestErrorAction {
    readonly type: typeof LOAD_INGREDIENTS_ERROR;
}

export type TIngredientsActions = 
    | ILoadIngredientsRequestAction
    | ILoadIngredientsRequestSuccessAction
    | ILoadIngredientsRequestErrorAction;

export const loadIngredientsRequest = (): TIngredientsActions => ({
        type: LOAD_INGREDIENTS_REQUEST
});    
export const loadIngredientsRequestSuccess = (ingredients: ReadonlyArray<TIngredient>): TIngredientsActions => ({
        type: LOAD_INGREDIENTS_SUCCESS,
        ingredients
});    
export const loadIngredientsRequestError = (): TIngredientsActions => ({
    type: LOAD_INGREDIENTS_ERROR
});    