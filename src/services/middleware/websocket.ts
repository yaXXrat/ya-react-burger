import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState, TApplicationActions } from '../types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TApplicationActions | any) => {
      const { dispatch } = store;
      const { type, payload } = action;
 
      if (type === 'WS_CONNECTION_START') {
            // объект класса WebSocket
        socket = new WebSocket(payload);

                // функция, которая вызывается при открытии сокета
        socket.onopen = (event: Event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event  });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: data });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };
      }else if (type === 'WS_SEND_MESSAGE') {
          if (socket) {
            const message = payload;
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