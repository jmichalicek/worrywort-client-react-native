import { combineReducers } from 'redux'
import { AUTH_LOGGING_IN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from './actions';

import { login } from './utils/api-client';

const authInitialState = {
  loggedIn: false,
  jwt: '',
  isRequesting: false
}

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case AUTH_LOGGING_IN:
      return Object.assign({}, state, {
        loggedIn: false,
        jwt: '',
        isRequesting: true
      });
      case AUTH_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          loggedIn: true,
          jwt: action.jwt,
          isRequesting: false
        });
      case AUTH_LOGIN_FAILURE:
        return Object.assign({}, state, {
          loggedIn: false,
          jwt: '',
          isRequesting: false
        });
    default:
      return state
  }
}

// just one now, but there will be more
const brewbaseClientReducer = combineReducers({
  auth: authReducer
});
export default brewbaseClientReducer;
