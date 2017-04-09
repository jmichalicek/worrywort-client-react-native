import { login } from './utils/api-client';

// AUTH actions
export const AUTH_LOGGING_IN = 'AUTH_LOGGING_IN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
// may need different failure types - auth vs server errors
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
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

// batchList actions
export const BATCH_LIST_REQUEST = 'BATCH_LIST_REQUEST'
export const batchListRequest = () => {type: BATCH_LIST_REQUEST};
export const BATCH_LIST_RECEIVED = 'BATCH_LIST_RECEIVED'
export const batchListReceived = () => {type: BATCH_LIST_RECEIVED};
