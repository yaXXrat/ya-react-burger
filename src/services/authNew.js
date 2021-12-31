import { SERVER_API_URL } from './config';

const refreshToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        return { sussess: false }
    }
    const response = await fetch(`${SERVER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
    })
    const result = response.json()
    if (result.success) {
        setAccessToken(result.accessToken)
        setRefreshToken(result.refreshToken)
    } else {
        setAccessToken('')
        setRefreshToken('')
    }
    return result
}


const sendRequest = async (endpoint, options) => {
    try {
        const response = await fetch(`${SERVER_API_URL}${endpoint}`, options)
        if(response.status==="403"){
            const result = await refreshToken()
            if (result.success) {
                options.headers.authorization = result.accessToken
                const response = await fetch(`${SERVER_API_URL}${endpoint}`, options)
                return await response.json()
            }
            return result;
        }

        const result = await response.json()
        return result;
    }
    catch (err) {
        return { sussess: false, error: err };
    }
}

export const login = async (email, password) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };
    const result = await sendRequest('/auth/login', options);
    return result;
}

export const logout = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getAccessToken()
        },
        body: JSON.stringify({ token: getRefreshToken() })
    };
    const result = await sendRequest('/auth/logout', options);
    return result;
}


export const updateUser = async ( name, email, password ) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getAccessToken()
        },
        body: JSON.stringify({ name, email, password })
    };
    const result = await sendRequest('/auth/user', options);
    return result;
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
    });
}

export const getAccessToken = () => { return getCookie('accessToken') };


export const setAccessToken = (accessToken) => {
  if (accessToken) {
      setCookie('accessToken', accessToken);
  }
  else {
      deleteCookie('accessToken');
  }
}

export const getRefreshToken = () => { return getCookie('refreshToken') };

export const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        setCookie('refreshToken', refreshToken);
    }
    else {
        deleteCookie('refreshToken');
    }
}
