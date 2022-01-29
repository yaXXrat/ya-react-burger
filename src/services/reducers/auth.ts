import type { TAuthActions } from '../actions/auth';
import { TUser } from '../../utils/types';

import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    RESET_PASS_SUCCESS,
    REGISTER_SUCCESS,
    FORGOT_PASS_SUCCESS, CLEAR_FORGOT_PASS_SUCCESS, CLEAR_RESET_PASS_SUCCESS,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    PROFILE_SUCCESS
} from '../constants/auth';

type TAuthState = {
    user: TUser,
    accessToken: string,
    refreshToken: string,
    updatePasswordSuccess: boolean,
    isLogged: boolean,
    resetSuccess: boolean,
    forgotSuccess: boolean,
    isTokenRefreshed: boolean
}

const initialState: TAuthState = {
    user: {
        name: "",
        email: ""
    },
    accessToken: "",
    refreshToken: "",
    updatePasswordSuccess: false,
    isLogged: false,
    resetSuccess: false,
    forgotSuccess: false,
    isTokenRefreshed: true
}

export const AuthReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.data.user.name,
                    email: action.data.user.email,
                },
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken,
                isLogged: true
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    name: action.data.user.name,
                    email: action.data.user.email
                }
            };
        case LOGOUT_SUCCESS:
            return {
                ...initialState,
                isLogged: false
            };
        case RESET_PASS_SUCCESS:
            return {
                ...state,
                resetSuccess: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.data.user.name,
                    email: action.data.user.email,
                },
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken,
                isLogged: true
            };
        case FORGOT_PASS_SUCCESS:
            return {
                ...state,
                forgotSuccess: true
            };
        case CLEAR_FORGOT_PASS_SUCCESS:
            return {
                ...state,
                forgotSuccess: false
            };
        case CLEAR_RESET_PASS_SUCCESS: 
            return {
                ...state,
                resetSuccess: false
            };
        case REFRESH_TOKEN_REQUEST: 
            return {
                ...state,
                isTokenRefreshed: false
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                isTokenRefreshed: true
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    name: action.data.name,
                    email: action.data.email
                }
            };
        default:
            return state;
    }
}
