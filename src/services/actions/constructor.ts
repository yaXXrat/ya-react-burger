import { SET_ORDER_INGREDIENT, REMOVE_ORDER_INGREDIENT, UPDATE_INGREDIENTS_ORDER, ERASE_INGREDIENTS_ORDER } from '../constants/constructor';
import { TIngredient } from '../../utils/types'

export interface ISetOrderIngredientAction {
    readonly type: typeof SET_ORDER_INGREDIENT;
    readonly ingredient: TIngredient;
}
export interface IRemoveOrderIngredientAction {
    readonly type: typeof REMOVE_ORDER_INGREDIENT;
    readonly ingredient: TIngredient;
}
export interface IUpdateIngredientsOrderAction {
    readonly type: typeof UPDATE_INGREDIENTS_ORDER;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}
export interface IEraseIngredientsOrderAction {
    readonly type: typeof ERASE_INGREDIENTS_ORDER;
}

export type TConstructorActions = 
    | ISetOrderIngredientAction
    | IRemoveOrderIngredientAction
    | IUpdateIngredientsOrderAction
    | IEraseIngredientsOrderAction;

export const setOrderIngredient = (ingredient: TIngredient): TConstructorActions => ({
    type: SET_ORDER_INGREDIENT,
    ingredient
});    
export const removeOrderIngredient = (ingredient: TIngredient): TConstructorActions => ({
    type: REMOVE_ORDER_INGREDIENT,
    ingredient
});
export const updateIngredientsOrder = (dragIndex: number, hoverIndex: number): TConstructorActions => ({
    type: UPDATE_INGREDIENTS_ORDER,
    dragIndex,
    hoverIndex
});    
export const eraseIngredientOrder = (): TConstructorActions => ({
    type: ERASE_INGREDIENTS_ORDER
});