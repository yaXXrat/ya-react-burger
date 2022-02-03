import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import type { TWebsocketActions } from '../actions/websocket';
import { newOrdersArrive, fetchOrders } from '../actions/orders';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
      console.log('action')
    return next => (action: TWebsocketActions) => {
      console.log('Inside socketMiddleware');
      const { dispatch } = store;
 
      if (action.type === 'WS_CONNECTION_START') {
        socket = new WebSocket(action.url);
        console.log('WS_CONNECTION_START')

        socket.onopen = (event: Event) => {
          console.log('onopen');
          dispatch(fetchOrders());
        };

        socket.onerror = event => {
//          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch(newOrdersArrive(data));
        };
        socket.onclose = event => {
          console.log('onclose')
//          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };
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