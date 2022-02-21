import {ordersReducer, initialState} from './orders'
import * as types from '../constants/orders'

describe('orders reducer', () => {

    it('should return the initial state', () => {
        expect(
            ordersReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle LOAD_INGREDIENTS', () => {
        expect(
            ordersReducer(
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
            ingredientPrices: new Map([[ 1, 10], [2, 20]])
        })
    })


    it('should handle NEW_ORDERS_ARRIVE', () => {
        expect(
            ordersReducer(
                {
                    ...initialState,
                    ingredientPrices: new Map([["60d3b41abdacab0026a733c7", 10],["60d3b41abdacab0026a733cd",20]])
                },
                {
                    type: types.NEW_ORDERS_ARRIVE,
                    payload: {
                        orders: [
                            {
                                "_id": "61fbc3786d7cd8001b2d3976",
                                "ingredients": [
                                    "60d3b41abdacab0026a733c7",
                                    "60d3b41abdacab0026a733cd",
                                    "60d3b41abdacab0026a733cd"
                                ],
                                "status": "done",
                                "name": "Space флюоресцентный бургер",
                                "createdAt": "2022-02-03T11:58:48.818Z",
                                "updatedAt": "2022-02-03T11:58:49.108Z",
                                "number": 9353
                            }
                        ],
                        total: 1,
                        totalToday: 1
                    }
                }
            )
        ).toEqual({
            ...initialState,
            ingredientPrices: new Map([["60d3b41abdacab0026a733c7", 10],["60d3b41abdacab0026a733cd",20]]),
            orders: [{
                id: 9353,
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
            }],
            total: 1,
            todayTotal: 1,
            isLoading: false
        })
    })


    it('should handle FETCH_ORDERS', () => {
        expect(
            ordersReducer(
                {
                    ...initialState
                },
                {
                    type: types.FETCH_ORDERS
                }
            )
        ).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should handle CLEAR_ORDERS', () => {
        expect(
            ordersReducer(
                {
                    ...initialState
                },
                {
                    type: types.CLEAR_ORDERS
                }
            )
        ).toEqual({
            ...initialState,
            orders: [],
            total: 0,
            todayTotal: 0
        })
    })


})
