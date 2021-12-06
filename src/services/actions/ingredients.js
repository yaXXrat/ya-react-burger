import { SET_ERROR_MESSAGE } from './error';
import { SERVER_API_URL } from '../config';

export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';

export function getIngredients() {
    return function(dispatch) {
        dispatch({type: LOAD_INGREDIENTS_REQUEST});
            fetch(SERVER_API_URL+'ingredients')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error happened during fetching! "+ res.status);
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
