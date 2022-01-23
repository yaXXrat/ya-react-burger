import { SERVER_API_URL } from './config';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_SUCCESS,
    FORGOT_PASS_ERROR,
    RESET_PASS_REQUEST,
    RESET_PASS_SUCCESS,
    RESET_PASS_ERROR,
    REFRESH_TOKEN_REQUEST,
//    REFRESH_TOKEN_SUCCESS,
//    REFRESH_TOKEN_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from './actions/auth';
import {SET_ERROR_MESSAGE} from './actions/error'

import { TResult, TOptions } from '../utils/types'
import { Dispatch } from 'redux';

const refreshToken = async ( ) => {
    try{
        const options: TOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: getRefreshToken()})
        };
        const response = await fetch(SERVER_API_URL+'auth/token',options);
        const result: TResult = await response.json();
        if(result.success){
            setAccessToken(result.accessToken)
            setRefreshToken(result.refreshToken)
        }else{
            setAccessToken("")
            setRefreshToken("")
        }
    } catch(err){
        console.log(err);
    }
}

export function getUser(){
    return async function(dispatch: Dispatch<any>) {
        try{ 
            dispatch({type:PROFILE_REQUEST});
            const options: TOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken()
                }
            };
            let response = await fetch(SERVER_API_URL+'auth/user',options);
            if(!response.ok){
                if(response.status === 403 || response.status === 401){
                    throw new Error("403");
                }else{
                    throw new Error("Error happened during data fetching while getting user data! " + response.status);
                }
            }
            const result: TResult = await response.json();
            
            if(result.success){
                dispatch({type: PROFILE_SUCCESS, data: result });
            } else {
                throw new Error("Error happened during profile update!");
            }
        }
        catch(err) {
            if (err instanceof Error) {
                if(err.message==="403"){
                    dispatch({type:REFRESH_TOKEN_REQUEST});
                    await refreshToken();
                    dispatch(getUser());
                }else{
                    dispatch({type: PROFILE_ERROR});
                    dispatch({type: SET_ERROR_MESSAGE, errorMessage: err.name+ ' ' + err.message});
                }
            }else{
                console.log('err ',err)
            }
        }
    };

}

export function updateUser(name: string, email: string, password: string){
    return async function(dispatch: Dispatch<any>) {
        try {
            dispatch({type:UPDATE_PROFILE_REQUEST});
            const options: TOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken()
                },
                body: JSON.stringify({email, name, password})
            };
            const response = await fetch(SERVER_API_URL+'auth/user',options);
            if(!response.ok){
                if(response.status === 403 || response.status === 401){
                    throw new Error("403");
                }else{
                    throw new Error("Error happened during data fetching while user data update! " + response.status);
                }
            }
            const result = await response.json();
            if(result.success){
                dispatch({type:UPDATE_PROFILE_SUCCESS, data: {name: name, email: email} });
            } else {
                throw new Error("Error happened during profile update!");
            }
        }
        catch(err) {
            if (err instanceof Error) {
                if(err.message==="403"){
                    dispatch({type:REFRESH_TOKEN_REQUEST});
                    await refreshToken();
                    dispatch(updateUser(name, email, password));
                }else{
                    dispatch({type: UPDATE_PROFILE_ERROR});
                    dispatch({type: SET_ERROR_MESSAGE, errorMessage: err.name+ ' ' + err.message});
                }
            }else{
                console.log('err ',err)
            }
        }
    };
}


export function registerUser(name: string, email: string, password: string){
    return function(dispatch: Dispatch) {
        dispatch({type:REGISTER_REQUEST});
        fetch(
            SERVER_API_URL+'auth/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            }
        )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error happened during data fetching while registration! " + response.status);
            }
        })
        .then((result) => {
            if(result.success){
                setAccessToken(result.accessToken)
                setRefreshToken(result.refreshToken)
                dispatch({type:REGISTER_SUCCESS, data: result});
            } else {
                throw new Error("Error happened during registration!");
            }
        })
        .catch((e) => {
            setAccessToken('')
            setRefreshToken('')
            dispatch({type: REGISTER_ERROR});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
        })
    };
}

export function login(email: string, password: string){
    return async function(dispatch: Dispatch) {
        try {
            dispatch({type:LOGIN_REQUEST});
            const options: TOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            };
            const response = await fetch(SERVER_API_URL+'auth/login',options);
            if(!response.ok){
                throw new Error("Error happened during data fetching while login! " + response.status);
            }
            const result = await response.json();
            if(result.success){
                setAccessToken(result.accessToken)
                setRefreshToken(result.refreshToken)
                result.user.password = password;
                dispatch({type:LOGIN_SUCCESS, data: result});
            } else {
                throw new Error("Error happened during login!");
            }
        }
        catch(err) {
            if (err instanceof Error) {
                setAccessToken('')
                setRefreshToken('')
                dispatch({type: LOGIN_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: err.name+ ' ' + err.message});
            }else{
                console.log('err ',err)
            }
        }
    };
}

export function logout(){
    return function(dispatch: Dispatch) {
        dispatch({type:LOGOUT_REQUEST});
        fetch(
            SERVER_API_URL+'auth/logout',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: getRefreshToken()})
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error happened during data fetching while logout! " + response.status);
                }
            })
            .then((result) => {
                if(result.success){
                    setAccessToken('');
                    setRefreshToken('');
                    dispatch({type:LOGOUT_SUCCESS});
                } else {
                    throw new Error("Error happened during logout!");
                }
            })
            .catch((e) => {
                dispatch({type: LOGOUT_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
            })
    };
}

export function forgot(email: string){
    return function(dispatch: Dispatch) {
        dispatch({type:FORGOT_PASS_REQUEST});
        fetch(
            SERVER_API_URL+'password-reset',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error happened during data fetching while reset! " + response.status);
                }
            })
            .then((result) => {
                if(result.success){
                    dispatch({type:FORGOT_PASS_SUCCESS, data: result});
                } else {
                    throw new Error("Error happened during reset!");
                }
            })
            .catch((e) => {
                dispatch({type: FORGOT_PASS_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});

            })
    };
}

export function reset( password: string, token: string ){
    return function(dispatch: Dispatch) {
        dispatch({type:RESET_PASS_REQUEST});
        fetch(
            SERVER_API_URL+'password-reset/reset',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password, token})
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error happened during data fetching while reset! " + response.status);
                }
            })
            .then((result) => {
                if(result.success){
                    dispatch({type:RESET_PASS_SUCCESS, data: result});
                } else {
                    throw new Error("Error happened during reset!");
                }
            })
            .catch((e) => {
                dispatch({type: RESET_PASS_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
            })
    };
}

export function getCookie(name: string) {
    let matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}
  
export function deleteCookie(name: string) {
    setCookie(name, "", {
      'max-age': -1
    })
}

export const getAccessToken = () => { return getCookie('accessToken') }


export const setAccessToken = (accessToken: string | undefined) => {
  if (accessToken) {
    setCookie('accessToken', accessToken)
  } else {
    deleteCookie('accessToken')
  }
}

export const getRefreshToken = () => { return getCookie('refreshToken') }

export const setRefreshToken = (refreshToken: string | undefined) => {
    if (refreshToken) {
        setCookie('refreshToken', refreshToken)
    }
    else {
        deleteCookie('refreshToken')
    }
}
