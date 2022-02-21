import {burgerIngredientReducer, initialState} from './ingredient'
import * as types from '../constants/ingredient'

describe('ingredient reducer', () => {
    it('should return the initial state', () => {
        expect(
            burgerIngredientReducer(undefined, {})
        ).toEqual(initialState)
    })


    it('should handle SET_CURRENT_INGREDIENT', () => {
        expect(
            burgerIngredientReducer(
                {
                    ...initialState
                },
                {
                    type: types.SET_CURRENT_INGREDIENT,
                    ingredient: {ingredient: {}, index: 1, id: 0}
                }
            )
        ).toEqual({
            ...initialState,
            selectedIngredient: {ingredient: {}, index: 1, id: 0}
        })
    })

    it('should handle RESET_CURRENT_INGREDIENT', () => {
        expect(
            burgerIngredientReducer(
                {
                    ...initialState,
                    selectedIngredient: {ingredient: {}, index: 1, id: 0}
                },
                {
                    type: types.RESET_CURRENT_INGREDIENT
                }
            )
        ).toEqual({
            ...initialState
        })
    })
})
