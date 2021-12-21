import { SERVER_API_URL } from './config';

const authRequest = async (endpoint, body, method) => {
    let result = undefined;
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        }
        const accessToken = getAccessToken()
        if (accessToken) {
            options.headers.authorization = accessToken
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(`${SERVER_API_URL}${endpoint}`, options)
        result = await response.json()
    }
    catch (e) {
        result = { success: false, message: e.name + ' ' + e.message }
    }
    return result

}

const postRequest = async (endpoint, body) => {
    return authRequest(endpoint, body, "POST")
}

// const getRequest = async (endpoint) => {
//     return authRequest(endpoint, null, "GET")
// }

// const patchRequest = async (endpoint, body) => {
//     return authRequest(endpoint, body, "PATCH")
// }

export const resetPassword = async email => postRequest('password-reset', { email })


export const updatePassword = async (password, token) => postRequest('password-reset/reset', { password, token })

export const registerUser = async (name, email, password) => {
    const result = await postRequest('auth/register', { name, email, password })
    if (result.success) {
        setAccessToken(result.accessToken)
        setRefreshToken(result.refreshToken)
    }
    return result
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


const setAccessToken = (accessToken) => {
  if (accessToken) {
      setCookie('accessToken', accessToken)
  }
  else {
      deleteCookie('accessToken')
  }
}

export const getRefreshToken = () => { getCookie('refreshToken') }

const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        setCookie('refreshToken', refreshToken)
    }
    else {
        deleteCookie('refreshToken')
    }
}