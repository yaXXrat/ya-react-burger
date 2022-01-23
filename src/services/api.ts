import { SET_ERROR_MESSAGE } from './actions/error';
import { SERVER_API_URL } from './config';
import { Dispatch } from 'redux';
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './actions/ingredients'
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, ERASE_ORDER } from './actions/order'
import {TIngredientsIds} from "../utils/types";

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
