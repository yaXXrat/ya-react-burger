import {serverOrderReducer, initialState} from './server-order'
import * as types from '../constants/orders'
import {
    LOAD_ORDER_FROM_SERVER_SUCCESS,
    SET_ORDER_LOCAL
} from '../constants/server-order';

describe('server-order reducer', () => {

    it('should return the initial state', () => {
        expect(
            serverOrderReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle SET_ORDER_LOCAL', () => {
        expect(
            serverOrderReducer(
                {
                    ...initialState
                },
                {
                    type: SET_ORDER_LOCAL,
                    payload: {}
                }
            )
        ).toEqual({
            ...initialState,
            currentOrder: {},
            isLoaded: true
        })
    })


    it('should handle LOAD_INGREDIENTS', () => {
        expect(
            serverOrderReducer(
                {
                    ...initialState
                },
                {
                    type: types.LOAD_INGREDIENTS,
                    ingredients: [{_id: 1, price: 10}, {_id: 2, price: 20}]
                }
            )
        ).toEqual({
            ...initialState,
            ingredientPrices: new Map([[1, 10], [2, 20]])
        })
    })


    it('should handle LOAD_ORDER_FROM_SERVER_SUCCESS', () => {
        expect(
            serverOrderReducer(
                {
                    ...initialState,
                    ingredientPrices: new Map([["60d3b41abdacab0026a733c7", 10], ["60d3b41abdacab0026a733cd", 20]])
                },
                {
                    type: LOAD_ORDER_FROM_SERVER_SUCCESS,
                    payload: {
                        "id": 1,
                        "_id": "61fbc3786d7cd8001b2d3976",
                        "ingredients": [
                            "60d3b41abdacab0026a733c7",
                            "60d3b41abdacab0026a733cd",
                            "60d3b41abdacab0026a733cd"
                        ],
                        "status": "done",
                        "fullname": "Space флюоресцентный бургер",
                        "createdAt": "2022-02-03T11:58:48.818Z",
                        "updatedAt": "2022-02-03T11:58:49.108Z",
                        "number": 9353
                    },
                }
            )
        ).toEqual({
            ...initialState,
            ingredientPrices: new Map([["60d3b41abdacab0026a733c7", 10], ["60d3b41abdacab0026a733cd", 20]]),
            currentOrder: {
                id: 1,
                _id: "61fbc3786d7cd8001b2d3976",
                fullname: "Space флюоресцентный бургер",
                status: "done",
                createdAt: "2022-02-03T11:58:48.818Z",
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd"
                ],
                total: 50
            },
            isLoaded: true
        })
    })

})
