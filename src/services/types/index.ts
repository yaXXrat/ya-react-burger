import { store } from '../store';
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TAuthActions} from "../actions/auth";
import {TConstructorActions} from "../actions/constructor";
import {TErrorActions} from "../actions/error";
import {TIngredientActions} from "../actions/ingredient";
import {TIngredientsActions} from "../actions/ingredients";

export type TApplicationActions = TAuthActions | TConstructorActions | TErrorActions | TIngredientActions | TIngredientsActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>



