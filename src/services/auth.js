import { SERVER_API_URL } from './config';

const authRequest = async (endpoint, body, method) => {
    let result = undefined;
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
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


export const registerUser = async (name, email, password) => postRequest('auth/register', { name, email, password })