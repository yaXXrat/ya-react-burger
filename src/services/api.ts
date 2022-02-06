import { SET_ERROR_MESSAGE } from './constants/error';
import { SERVER_API_URL, WS_API_URL } from './config';
import { Dispatch } from 'redux';
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './constants/ingredients'
import { LOAD_INGREDIENTS } from './constants/orders';
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, ERASE_ORDER } from './constants/order'
import {TIngredientsIds, TOptions} from "./types/types";
import {TFeedOrder,IServerOrder} from "./types/orders";

import { clearOrders } from './actions/orders';
import { wsConnectionStart } from './actions/websocket';
import { AppDispatch } from './types';
import { getAccessToken } from './auth';

import { loadOrderFromServer, setOrderLocal } from './actions/server-order';

export function getIngredients() {
    return function(dispatch: Dispatch) {
        dispatch({type: LOAD_INGREDIENTS_REQUEST});
            fetch(SERVER_API_URL+'ingredients')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error happened during fetching! " + res.status);
                }
            })
            .then((results) => {
                dispatch({type: LOAD_INGREDIENTS_SUCCESS, ingredients: results.data});
                dispatch({type: LOAD_INGREDIENTS, ingredients: results.data});
            })
            .catch((e) => {
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
                dispatch({type: LOAD_INGREDIENTS_ERROR});
            })
    };
}

export function createOrder(ingredientsIDs: TIngredientsIds, totalPrice: number){
    return function(dispatch: Dispatch) {
        dispatch({type:MAKE_ORDER_REQUEST});
        fetch(
            SERVER_API_URL+'orders',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(ingredientsIDs)
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Error happened during data fetching while order creation! " + res.status);
            }
        })
        .then((results) => {
            let newOrder = {
                number: 0,
                success: true,
                name: "",
                ingredients: [ingredientsIDs],
                price: totalPrice
            }
            newOrder.number = results.order.number
            newOrder.name = results.name
            newOrder.success = results.success
            if(results.success){
                dispatch({type:MAKE_ORDER_SUCCESS, order: newOrder});
            } else {
                throw new Error("Error happened during order creation!");
            }
        })
        .catch((e) => {
            dispatch({type: ERASE_ORDER});
            dispatch({type: MAKE_ORDER_ERROR});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});

        })
    };
}

async function fetchOrderInfo(orderID: string) {
    const options: TOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(SERVER_API_URL+'orders/'+orderID,options);

    return response;
}
export function getOrderInfo(orderId: string | undefined) {
    return async function(dispatch: AppDispatch) {
        dispatch(loadOrderFromServer());
        try{
            if(typeof orderId == 'undefined') {
                throw new Error("Error: no orderId!");
            }
            let response = await fetchOrderInfo(orderId);
            const result: any = await response.json();
            
            if(result.success){
                let inOrder: IServerOrder = result.orders[0];
                let newOrder: TFeedOrder = {
                    id: inOrder.number,
                    _id: inOrder._id,
                    createdAt: inOrder.createdAt,
                    fullname: inOrder.name,
                    ingredients: inOrder.ingredients,
                    status: inOrder.status,
                    total: 0
                }
    
                dispatch(setOrderLocal(newOrder));
            } else {
                console.log(result)
                throw new Error("Error happened during order info fetch!");
            }
        }
        catch(err) {
            if (err instanceof Error) {
                    dispatch({type: SET_ERROR_MESSAGE, errorMessage: err.name+ ' ' + err.message});
            }else{
                console.log('err ',err)
            }
        }
    };

}

const FETCH_ALL_ORDERS_URL = `${WS_API_URL}/orders/all`;
const FETCH_ORDERS_FOR_USER_URL = `${WS_API_URL}/orders`;

const startFetching = async (dispatch: AppDispatch, url: string) => {
    dispatch(wsConnectionStart(url));
}

export const fetchAllOrders = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch(clearOrders());
        await startFetching(dispatch, FETCH_ALL_ORDERS_URL);
    } catch(ex){
    }
}

export const fetchOrdersByUser = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch(clearOrders());
        let token = getAccessToken();
        if (token){
            token = token.replace('Bearer', '');
            token = token.trim();
        }
        const url = `${FETCH_ORDERS_FOR_USER_URL}?token=${token}`;
        await startFetching(dispatch, url);
    } catch(ex){
    }
}