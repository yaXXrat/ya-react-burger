import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CLOSE
} from '../constants/websocket';

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START
}

export const wsConnectionStart = (url: string): TWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START
    };
};


export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export const wsConnectionSuccess = (): TWsConnectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR
    payload: Event
}

export const wsConnectionError = (event: Event): TWsConnectionErrorAction => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: event
    };
};

export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export const wsConnectionClosed = (): TWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE,
    payload: string
}

export const wsGetMessage = (message: string): TWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE,
    payload: string
}

export const wsSendMessage = (message: string) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export type TWsCloseAction = {
    readonly type: typeof WS_CLOSE
}

export const wsClose = () => {
    return {
        type: WS_CLOSE
    };
};
export type TWebsocketActions = 
    TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetMessageAction
    | TWsSendMessageAction
    | TWsCloseAction;