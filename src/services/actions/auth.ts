import { TUser, TAuthUserData, TUserData } from '../types/types';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    RESET_PASS_SUCCESS,
    REGISTER_SUCCESS,
    FORGOT_PASS_SUCCESS, 
    CLEAR_FORGOT_PASS_SUCCESS, 
    CLEAR_RESET_PASS_SUCCESS,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    PROFILE_SUCCESS
} from '../constants/auth';

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly data: TAuthUserData
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface IResetPassSuccessAction {
    readonly type: typeof RESET_PASS_SUCCESS;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly data: TAuthUserData;
}
export interface IForgotPassSuccessAction {
    readonly type: typeof FORGOT_PASS_SUCCESS;
}
export interface IClearForgotPassSuccessAction {
    readonly type: typeof CLEAR_FORGOT_PASS_SUCCESS;
}
export interface IClearResetPassSuccessAction {
    readonly type: typeof CLEAR_RESET_PASS_SUCCESS;
}
export interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IUpdateProfileSuccessAction {
    readonly type: typeof UPDATE_PROFILE_SUCCESS;
    readonly data: TUser;
}
export interface IProfileSuccessAction {
    readonly type: typeof PROFILE_SUCCESS;
    readonly data: TUserData;
}

export type TAuthActions = 
        | ILoginSuccessAction
        | ILogoutSuccessAction
        | IResetPassSuccessAction
        | IRegisterSuccessAction
        | IForgotPassSuccessAction
        | IClearForgotPassSuccessAction
        | IClearResetPassSuccessAction
        | IRefreshTokenRequestAction
        | IRefreshTokenSuccessAction
        | IUpdateProfileSuccessAction
        | IProfileSuccessAction;

export const loginSuccess = (data: TAuthUserData): TAuthActions => ({
    type: LOGIN_SUCCESS,
    data
});    
export const logoutSuccess = (): TAuthActions => ({
    type: LOGOUT_SUCCESS
});    
export const resetPassSuccess = (): TAuthActions => ({
    type: RESET_PASS_SUCCESS
});    
export const registerSuccess = (data: TAuthUserData): TAuthActions => ({
    type: REGISTER_SUCCESS,
    data
});    
export const forgotPassSuccess = (): TAuthActions => ({
    type: FORGOT_PASS_SUCCESS
});    
export const clearForgotPassSuccess = (): TAuthActions => ({
    type: CLEAR_FORGOT_PASS_SUCCESS
});    
export const clearResetPassSuccess = (): TAuthActions => ({
    type: CLEAR_RESET_PASS_SUCCESS
});    
export const refreshTokenRequest = (): TAuthActions => ({
    type: REFRESH_TOKEN_REQUEST
});    
export const refreshTokenSuccess = (): TAuthActions => ({
    type: REFRESH_TOKEN_SUCCESS
});    
export const updateProfileSuccess = (data: TUser): TAuthActions => ({
    type: UPDATE_PROFILE_SUCCESS,
    data
});    
export const profileSuccess = (data: TUserData): TAuthActions => ({
    type: PROFILE_SUCCESS,
    data
});    
