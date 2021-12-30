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


const sendRequest = async (endpoint, options) => {
    try{
        const response = await fetch(endpoint,options);
        return response;
    }catch(err){
        console.log(err)
    }
}

const refreshToken = async ( ) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: getRefreshToken()})
    };
    const response = await sendRequest(SERVER_API_URL+'auth/token',options);
    const result = await response.json();
    if(result.success){
        setAccessToken(result.accessToken)
        setRefreshToken(result.refreshToken)
    }
}

export function getUser(){
    return async function(dispatch) {
        try{ 
            dispatch({type:PROFILE_REQUEST});
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken()
                }
            };
            let response = await sendRequest(SERVER_API_URL+'auth/user',options);
            if(!response.ok){
                if(response.status === 403 || response.status === 401){
                    throw new Error("403");
                }else{
                    throw new Error("Error happened during data fetching while getting user data! " + response.status);
                }
            }
            const result = await response.json();
            
            if(result.success){
                console.log('GET',JSON.stringify(result));
                dispatch({type: PROFILE_SUCCESS, data: result });
            } else {
                throw new Error("Error happened during profile update!");
            }
        }
        catch(e) {
            if(e.message==="403"){
                dispatch({type:REFRESH_TOKEN_REQUEST});
                await refreshToken();
                dispatch(getUser());

            }else{
                dispatch({type: PROFILE_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
            }
        }
    };

}

export function updateUser(name, email, password){
    return async function(dispatch) {
        try {
            dispatch({type:UPDATE_PROFILE_REQUEST});
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessToken()
                },
                body: JSON.stringify({email, name})
            };
            const response = await sendRequest(SERVER_API_URL+'auth/user',options);
            if(!response.ok){
                if(response.status === 403 || response.status === 401){
                    throw new Error("403");
                }else{
                    throw new Error("Error happened during data fetching while user data update! " + response.status);
                }
            }
            const result = await response.json();
            if(result.success){
                console.log('UPDATE:',JSON.stringify(result));
                dispatch({type:UPDATE_PROFILE_SUCCESS, data: {name: name, email: email, password: password} });
            } else {
                throw new Error("Error happened during profile update!");
            }
        }
        catch(e) {
            if(e.message==="403"){
                dispatch({type:REFRESH_TOKEN_REQUEST});
                await refreshToken();
                dispatch(updateUser(name, email, password));
            }else{
                dispatch({type: UPDATE_PROFILE_ERROR});
                dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
            }
        }
    };
}


export function registerUser(name, email, password){
    return function(dispatch) {
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

export function login(email, password){
    return async function(dispatch) {
        try {
            dispatch({type:LOGIN_REQUEST});
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            };
            const response = await sendRequest(SERVER_API_URL+'auth/login',options);
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
        catch(e){
            setAccessToken('')
            setRefreshToken('')
            dispatch({type: LOGIN_ERROR});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name+ ' ' + e.message});
        }
    };
}

export function logout(){
    return function(dispatch) {
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

export function forgot(email){
    return function(dispatch) {
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

export function reset( password, token ){
    return function(dispatch) {
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

export function getCookie(name) {
    let matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
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
  
export function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}

export const getAccessToken = () => { return getCookie('accessToken') }


export const setAccessToken = (accessToken) => {
  if (accessToken) {
    setCookie('accessToken', accessToken)
  } else {
    deleteCookie('accessToken')
  }
}

export const getRefreshToken = () => { return getCookie('refreshToken') }

export const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        setCookie('refreshToken', refreshToken)
    }
    else {
        deleteCookie('refreshToken')
    }
}
