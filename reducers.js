import { combineReducers } from 'redux'
import { DO_LOGIN } from './actions';

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
                loggedIn: true,
                jwt: login(action.username, action.password)
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
