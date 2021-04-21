import { userService } from "../../services/user.service"

export function getUser() {
    return async dispatch => {
        const user = await userService.getUser();
        dispatch({ type: 'SET_USER', user })
    }
}

export function signup(name) {
    return dispatch => {
        const user = userService.signup(name);
        dispatch({ type: 'SET_USER', user })
    }
}

export function logout() {
    return dispatch => {
        userService.logout();
        dispatch({ type: 'SET_USER', user:null })
    }
}
