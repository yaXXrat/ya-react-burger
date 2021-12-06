import {SET_ERROR_MESSAGE} from './error';
import { SERVER_API_URL } from '../config';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_ERROR  = 'MAKE_ORDER_ERROR';
export const ERASE_ORDER = 'ERASE_ORDER';

export const SET_ORDER_INGREDIENTS  = 'SET_ORDER_INGREDIENTS';
export const SET_ORDER_INGREDIENT  = 'SET_ORDER_INGREDIENT';
export const REMOVE_ORDER_INGREDIENT  = 'REMOVE_ORDER_INGREDIENT';

export const UPDATE_ORDER = 'UPDATE_ORDER';

export function createOrder(ingredientsIDs,newOrder){
    return function(dispatch) {
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
                throw new Error("Error happened during data fetching while order creation!");
            }
        })
        .then((results) => {
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
