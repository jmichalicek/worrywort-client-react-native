import { combineReducers } from 'redux'
import { DO_LOGIN } from './actions';

import { login } from './utils/api-client';

const initialState = {
    auth: {
        loggedIn: false,
        jwt: ''
    },
    brewBatches: [],
}

function loginReducer(state = {}, action) {
  console.log(action);
    switch (action.type) {
        case DO_LOGIN:
            return Object.assign({}, state, {
                loggedIn: true,
                jwt: login(action.username, action.password)
            });
        default:
            return state
    }
}

// just one now, but there will be more
const brewbaseClientReducer = combineReducers({loginReducer});
export default brewbaseClientReducer;
