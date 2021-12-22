import { SERVER_API_URL } from './config';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './actions/auth';
import { SET_ERROR_MESSAGE } from './actions/error'

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

export const getAccessToken = () => { getCookie('accessToken') }


export const setAccessToken = (accessToken) => {
  if (accessToken) {
      setCookie('accessToken', accessToken)
  }
  else {
      deleteCookie('accessToken')
  }
}

export const getRefreshToken = () => { getCookie('refreshToken') }

export const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        setCookie('refreshToken', refreshToken)
    }
    else {
        deleteCookie('refreshToken')
    }
}