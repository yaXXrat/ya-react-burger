import {burgerIngredientsReducer, initialState} from './ingredients'
import * as types from '../constants/ingredients'

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(
            burgerIngredientsReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle LOAD_INGREDIENTS_REQUEST', () => {
        expect(
            burgerIngredientsReducer(
                {
                    ...initialState
                },
                {
                    type: types.LOAD_INGREDIENTS_REQUEST
                }
            )
        ).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should handle LOAD_INGREDIENTS_ERROR', () => {
        expect(
            burgerIngredientsReducer(
                {
                    ...initialState,
                    isLoading: true,
                    allIngredients: [{}, {}]
                },
                {
                    type: types.LOAD_INGREDIENTS_ERROR
                }
            )
        ).toEqual({
            ...initialState
        })
    })

    it('should handle LOAD_INGREDIENTS_SUCCESS', () => {
        expect(
            burgerIngredientsReducer(
                {
                    ...initialState
                },
                {
                    type: types.LOAD_INGREDIENTS_SUCCESS,
                    ingredients: [{}, {}]
                }
            )
        ).toEqual({
            ...initialState,
            allIngredients: [{}, {}]
        })
    })

})
