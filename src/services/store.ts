import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/websocket';
import { compose } from 'redux';
import { TWsActions } from './types';

import { FETCH_ORDERS, NEW_ORDERS_ARRIVE } from './constants/orders';
import { WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CLOSE, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE } from './constants/websocket';


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const wsActions: TWsActions = {
    onInit: WS_CONNECTION_START,
    onOpen: FETCH_ORDERS,
    onMessage: NEW_ORDERS_ARRIVE,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CLOSE,
    onClosed: WS_CONNECTION_CLOSED,
    onSend: WS_SEND_MESSAGE
  }
    
const webSocketMiddleware = socketMiddleware(wsActions);

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,webSocketMiddleware));

export const store = createStore(rootReducer, enhancer);
