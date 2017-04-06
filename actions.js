import { login } from './utils/api-client';

export const AUTH_LOGGING_IN = 'AUTH_LOGGING_IN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
// may need different failure types - auth vs server errors
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';


// just copied from http://redux.js.org/docs/basics/Actions.html
// I assume this needs to actually do something, like login
// and maybe return or set the jwt in a store.
export function loggingIn() {
    return {type: AUTH_LOGGING_IN};
}

export function loginSuccess(jwt) {
    return {type: AUTH_LOGIN_SUCCESS, jwt};
}

export function loginFailure() {
    return {type: AUTH_LOGIN_FAILURE};
}

export function doLogin(username, password) {
  return function (dispatch) {
    dispatch(loggingIn());
    login(username, password).then((responseJson) => {
        // need to handle errors, but here is good handling
        var token = responseJson.data.login.token;
        dispatch(loginSuccess(token));
    })
    .catch((error) => {
        console.log(error);
        dispatch(loginFailure());
    });
  }
}

// Review shouldFetchPosts, etc from http://redux.js.org/docs/advanced/AsyncActions.html#actionsjs
// for possible shouldLogin, etc.
