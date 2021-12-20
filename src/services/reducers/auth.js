import { LOGIN_SUCCESS, LOGOUT_SUCCESS, RESET_PASS_SUCCESS, REGISTER_SUCCESS } from '../actions/auth';

const initialState = {
    user: {
        name: "",
        email: "",
        password: ""
    },
    accessToken: "",
    refreshToken: "",
    resetSuccess: false,
    updatePasswordSuccess: false,
    isLogged: false
}

export const AuthReducer = (state = initialState, action) => {
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
                    name: action.data.name,
                    email: action.data.email,
                },
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken,
                isLogged: true
            };
        default:
            return state;
    }
}