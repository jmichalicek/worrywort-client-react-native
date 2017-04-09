import { combineReducers } from 'redux'
import { AUTH_LOGGING_IN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, BATCH_LIST_REQUEST, BATCH_LIST_RECEIVED } from './actions';

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

const batchListInitialState = {
  batches: [],
  isRequesting: false,
}
const batchListReducer = (state = batchListInitialState, action) => {
  switch (action.type) {
    case BATCH_LIST_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        batches: []
      });
    case BATCH_LIST_RECEIVED:
      return Object.assign({}, state, {
        isRequesting: false,
        batches: [
          {name: 'reducer row 1'},
          {name: 'reducer row 2'}
        ]
      });
    default:
      return state;
  }
}

// just one now, but there will be more
const brewbaseClientReducer = combineReducers({
  auth: authReducer,
  batchList: batchListReducer,
});
export default brewbaseClientReducer;
