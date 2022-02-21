import {orderReducer, initialState} from './order'
import * as types from '../constants/order'


describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(
            orderReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle MAKE_ORDER_REQUEST', () => {
        expect(
            orderReducer(
                {
                    ...initialState,
                    isLoading: false
                },
                {
                    type: types.MAKE_ORDER_REQUEST
                }
            )
        ).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should handle MAKE_ORDER_ERROR', () => {
        expect(
            orderReducer(
                {
                    ...initialState,
                    isLoading: false
                },
                {
                    type: types.MAKE_ORDER_ERROR
                }
            )
        ).toEqual({
            ...initialState,
            isLoading: false
        })
    })

    it('should handle MAKE_ORDER_SUCCESS', () => {
        expect(
            orderReducer(
                {
                    ...initialState
                },
                {
                    type: types.MAKE_ORDER_SUCCESS,
                    order: {
                        number: 12,
                        success: true,
                        name: "order name",
                        ingredients: [],
                        price: 12
                    }
                }
            )
        ).toEqual({
            ...initialState,
            orderCreated: true,
            currentOrder: {
                number: 12,
                success: true,
                name: "order name",
                ingredients: [],
                price: 12
            }
        })
    })

    it('should handle ERASE_ORDER', () => {
        expect(
            orderReducer(undefined, {})
        ).toEqual(initialState)
    })

})
