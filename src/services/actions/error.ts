import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from "../constants/error";

export interface ISetErrorMessageAction {
    readonly type: typeof SET_ERROR_MESSAGE;
    readonly errorMessage: string;
  }
export interface IResetErrorMessageAction {
    readonly type: typeof RESET_ERROR_MESSAGE;
  }

export type TErrorActions = 
    | ISetErrorMessageAction
    | IResetErrorMessageAction;  

export const setErrorMessage = (text: string): TErrorActions => ({
    type: SET_ERROR_MESSAGE,
    errorMessage: text
  });    
export const resetErrorMessage = (): TErrorActions => ({
    type: RESET_ERROR_MESSAGE
  });      
