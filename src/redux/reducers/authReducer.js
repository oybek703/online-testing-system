import {AUTH_ERROR, AUTH_SUCCESS, AUTO_LOGOUT} from "@src/redux/actionTypes";

const initialState = {
    token: null,
    error:null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ... state,
                token: action.token
            }
        case AUTO_LOGOUT:
            return {
                ... state,
                token: null
            }
        case AUTH_ERROR:
            return  {
                ... state,
                error: action.message
            }
        default:
            return state
    }
}