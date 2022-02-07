import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import type { TWebsocketActions } from '../actions/websocket';
import {
    WS_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_SEND_MESSAGE
} from "../constants/websocket";
import { TWsActions, } from '../types';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
    return next => (action: TWebsocketActions) => {
      const { dispatch } = store;
      const { onOpen, onMessage, onError } = wsActions;

      if (action.type === WS_CONNECTION_START) {
        socket = new WebSocket(action.url);
        if(socket){

          socket.onopen = () => {
            dispatch({type: onOpen});
          };

          socket.onerror = event => {
            dispatch({ type: onError, payload: event});
          };
    
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({type: onMessage, payload: parsedData});
          };

          socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
          };
        }
      }else if (action.type === WS_SEND_MESSAGE) {
          if (socket) {
            const message = action.payload;
            socket.send(JSON.stringify(message));
          }
      } else if (action.type === WS_CLOSE ) {
          if (socket){
              socket.close();
            }
      }
      next(action);
    };
    }) as Middleware;
}; 
