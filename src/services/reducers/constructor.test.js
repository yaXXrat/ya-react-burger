import {constructorReducer, initialState} from './constructor'
import * as types from '../constants/constructor'

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(
            constructorReducer(undefined, {})
        ).toEqual(initialState)
    })


    it('should handle SET_ORDER_INGREDIENT', () => {
        expect(
            constructorReducer(
                {
                    ...initialState
                },
                {
                    type: types.SET_ORDER_INGREDIENT,
                    ingredient: {}
                }
            )
        ).toEqual({
            ...initialState,
            lastIndex: 1,
            constructorIngredients: [{ingredient: {}, index: 1, id: 0}],
        })
    })

    it('should handle REMOVE_ORDER_INGREDIENT', () => {
        expect(
            constructorReducer(
                {
                    ...initialState,
                    lastIndex: 1,
                    constructorIngredients: [{ingredient: {}, index: 1, id: 0}],
                },
                {
                    type: types.REMOVE_ORDER_INGREDIENT,
                    item: {ingredient: {}, id: 0, index: 1}
                }
            )
        ).toEqual({
            ...initialState,
            lastIndex: 1,
            constructorIngredients: []
        })
    })

    it('should handle UPDATE_INGREDIENTS_ORDER', () => {
        expect(
            constructorReducer(
                {
                    ...initialState,
                    constructorIngredients: [{ingredient: {}, index: 1, id: 0}, {ingredient: {}, index: 2, id: 1}],
                },
                {
                    type: types.UPDATE_INGREDIENTS_ORDER,
                    dragIndex: 0,
                    hoverIndex: 1
                }
            )
        ).toEqual({
            ...initialState,
            constructorIngredients: [{ingredient: {}, index: 2, id: 1}, {ingredient: {}, index: 1, id: 0}]
        })
    })

    it('should handle ERASE_INGREDIENTS_ORDER', () => {
        expect(
            constructorReducer(
                {
                    ...initialState
                },
                {
                    type: types.ERASE_INGREDIENTS_ORDER,
                }
            )
        ).toEqual({
            ...initialState
        })
    })
})
