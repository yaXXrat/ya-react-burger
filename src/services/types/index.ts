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
import { WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CLOSE, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE } from "../constants/websocket";

export type TWsActions = {
  readonly onInit: typeof WS_CONNECTION_START,
  readonly onOpen: typeof FETCH_ORDERS,
  readonly onMessage: typeof NEW_ORDERS_ARRIVE,
  readonly onError: typeof WS_CONNECTION_ERROR,
  readonly onClose: typeof WS_CLOSE,
  readonly onClosed: typeof WS_CONNECTION_CLOSED,
  readonly onSend: typeof WS_SEND_MESSAGE
}

export type TApplicationActions = TAuthActions | TConstructorActions | TErrorActions | TIngredientActions | TIngredientsActions | TWebsocketActions | TOrdersActions | TLoadOrderFromServerActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>




