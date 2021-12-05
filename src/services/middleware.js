import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './actions/ingredients';
import {MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_ERROR, SET_ORDER_INGREDIENT} from './actions/order';
import { SET_ERROR_MESSAGE } from './actions/error'

const LOAD_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const CREATE_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

export function getIngredients() {
    return function(dispatch) {
        dispatch({type: LOAD_INGREDIENTS_REQUEST});
        setTimeout(() => {
            fetch(LOAD_INGREDIENTS_URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error happened during fetching!");
                }
            })
            .then((results) => {
                dispatch({type: LOAD_INGREDIENTS_SUCCESS, ingredients: results.data});
                dispatch({type: SET_ORDER_INGREDIENT, ingredient: results.data.find( ingredient => ingredient.type === 'bun')});
            })
            .catch((e) => {
                dispatch({type: LOAD_INGREDIENTS_ERROR, errorMessage: e});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
            })
        }, 1000);
    };
}
export function createOrder(ingredientsIDs,newOrder){
    return function(dispatch) {
        dispatch({type:MAKE_ORDER_REQUEST});
        setTimeout(() => {
        fetch(
            CREATE_ORDER_URL,
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
            dispatch({type: MAKE_ORDER_ERROR, error: e});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
        })
        }, 1000);
    };
}
