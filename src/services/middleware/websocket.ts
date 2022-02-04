import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import type { TWebsocketActions } from '../actions/websocket';
import { newOrdersArrive, fetchOrders } from '../actions/orders';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
    return next => (action: TWebsocketActions) => {
      const { dispatch } = store;
 
      if (action.type === 'WS_CONNECTION_START') {
        socket = new WebSocket(action.url);
        if(socket){

          socket.onopen = () => {
            dispatch(fetchOrders());
          };

          socket.onerror = event => {
            dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
          };
    
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(newOrdersArrive(parsedData));
          };

          socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
          };
        }
      }else if (action.type === 'WS_SEND_MESSAGE') {
          if (socket) {
            const message = action.payload;
            socket.send(JSON.stringify(message));
          }
      } else if (action.type === 'WS_CLOSE' ) {
          if (socket){
              socket.close();
            }
      }
      next(action);
    };
    }) as Middleware;
}; 