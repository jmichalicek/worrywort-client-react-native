export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// may need different failure types - auth vs server errors
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


// just copied from http://redux.js.org/docs/basics/Actions.html
// I assume this needs to actually do something, like login
// and maybe return or set the jwt in a store.
export function doLogin(username, password) {
    return {type: DO_LOGIN, username, password};
}

export function loginSuccess(token) {
    return {type: LOGIN_SUCCESS, jwt};
}

export function loginFailure() {
    return {type: LOGIN_FAILURE};
}
