import { SET_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT } from '../constants/ingredient';
import { TIngredient } from '../types/types';

export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly ingredient: TIngredient;
  }
export interface IResetCurrentIngredientAction {
    readonly type: typeof RESET_CURRENT_INGREDIENT;
  }

export type TIngredientActions = 
    | ISetCurrentIngredientAction
    | IResetCurrentIngredientAction;  


export const setErrorMessage = (ingredient: TIngredient): TIngredientActions => ({
    type: SET_CURRENT_INGREDIENT,
    ingredient
  });    
export const resetErrorMessage = (): TIngredientActions => ({
    type: RESET_CURRENT_INGREDIENT
  });      
