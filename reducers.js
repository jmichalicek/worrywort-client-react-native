import { combineReducers } from 'redux'
import { DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

import { login } from './utils/api-client';

const authInitialState = {
    auth: {
        loggedIn: false,
        jwt: ''
    }
}

function authReducer(state = authInitialState, action) {
    switch (action.type) {
        case DO_LOGIN:
            // TODO: needs to be a thunk?  http://redux.js.org/docs/api/applyMiddleware.html
            // due to being async api call
            // http://redux.js.org/docs/advanced/AsyncActions.html
            return Object.assign({}, state, {
                loggedIn: false,
                jwt: '',
                isRequestion: true
            });
          case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggedIn: true,
                jwt: action.jwt,
                isRequestion: false
            });
          case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loggedIn: false,
                jwt: '',
                isRequestion: false
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
