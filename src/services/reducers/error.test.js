import {errorReducer, initialState} from './error'
import * as types from '../constants/error'


describe('Error reducer', () => {
    it('should return the initial state', () => {
        expect(
            errorReducer({errorMessage: ''}, {})
        ).toEqual(initialState)
    })

    it('should handle SET_ERROR_MESSAGE', () => {
        expect(
            errorReducer(
                {
                    ...initialState
                },
                {
                    type: types.SET_ERROR_MESSAGE,
                    errorMessage: 'SET_ERROR_MESSAGE test'
                }
            )
        ).toEqual({
            ...initialState,
            errorMessage: 'SET_ERROR_MESSAGE test'
        })
    })

    it('should handle RESET_ERROR_MESSAGE', () => {
        expect(
            errorReducer(
                {
                    ...initialState
                },
                {
                    type: types.RESET_ERROR_MESSAGE
                }
            )
        ).toEqual({
            ...initialState
        })
    })


})
