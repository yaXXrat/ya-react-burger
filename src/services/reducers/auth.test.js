import {authReducer, initialState} from './auth'
import * as types from '../constants/auth'


describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(
            authReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.LOGIN_SUCCESS,
                    data: {
                        user: {
                            name: 'artem',
                            email: 'artem@ovcharenko.com',
                        },
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken'
                    }
                }
            )
        ).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: 'artem',
                email: 'artem@ovcharenko.com'
            },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            isLogged: true
        })
    })

    it('should handle PROFILE_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.PROFILE_SUCCESS,
                    data: {
                        user: {
                            name: 'artem',
                            email: 'artem@ovcharenko.com',
                        }
                    }
                }
            )
        ).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: 'artem',
                email: 'artem@ovcharenko.com'
            },
            isLogged: true
        })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.LOGOUT_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            isLogged: false
        })
    })

    it('should handle RESET_PASS_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.RESET_PASS_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            resetSuccess: true
        })
    })

    it('should handle FORGOT_PASS_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.FORGOT_PASS_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            forgotSuccess: true
        })
    })

    it('should handle CLEAR_FORGOT_PASS_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.CLEAR_FORGOT_PASS_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            forgotSuccess: false
        })
    })

    it('should handle CLEAR_RESET_PASS_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.CLEAR_RESET_PASS_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            resetSuccess: false
        })
    })

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.REFRESH_TOKEN_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            isTokenRefreshed: false
        })
    })

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.REFRESH_TOKEN_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            isTokenRefreshed: true
        })
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.REGISTER_SUCCESS,
                    data: {
                        user: {
                            name: 'artem',
                            email: 'artem@ovcharenko.com',
                        },
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken'
                    }
                }
            )
        ).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: 'artem',
                email: 'artem@ovcharenko.com'
            },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            isLogged: true
        })
    })

    it('should handle UPDATE_PROFILE_SUCCESS', () => {
        expect(
            authReducer(
                {
                    ...initialState
                },
                {
                    type: types.UPDATE_PROFILE_SUCCESS,
                    data: {
                        name: 'artem',
                        email: 'artem@ovcharenko.com',
                    }
                }
            )
        ).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: 'artem',
                email: 'artem@ovcharenko.com'
            }
        })
    })

})
