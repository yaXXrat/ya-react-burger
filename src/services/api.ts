import { SET_ERROR_MESSAGE } from './constants/error';
import { SERVER_API_URL, WS_API_URL } from './config';
import { Dispatch } from 'redux';
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './constants/ingredients'
import { LOAD_INGREDIENTS } from './constants/orders';
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, ERASE_ORDER } from './constants/order'
import {TIngredientsIds} from "./types/types";

import { clearOrders } from './actions/orders';
import { wsConnectionStart } from './actions/websocket';
import { AppDispatch } from './types';
import { getAccessToken } from './auth';

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