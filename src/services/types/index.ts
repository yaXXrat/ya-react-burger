import { store } from '../store';
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TWebsocketActions} from "../actions/websocket";
import {TAuthActions} from "../actions/auth";
import {TConstructorActions} from "../actions/constructor";
import {TErrorActions} from "../actions/error";
import {TIngredientActions} from "../actions/ingredient";
import {TIngredientsActions} from "../actions/ingredients";
import {TOrdersActions} from "../actions/orders";
import {TLoadOrderFromServerActions} from "../actions/server-order";

import { FETCH_ORDERS, NEW_ORDERS_ARRIVE } from "../constants/orders";
import { WS_CONNECTION_ERROR } from "../constants/websocket";

export type TWsActions = {
  readonly onOpen: typeof FETCH_ORDERS,
  readonly onMessage: typeof NEW_ORDERS_ARRIVE,
  readonly onError: typeof WS_CONNECTION_ERROR
}

export type TApplicationActions = TAuthActions | TConstructorActions | TErrorActions | TIngredientActions | TIngredientsActions | TWebsocketActions | TOrdersActions | TLoadOrderFromServerActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>




