import { combineReducers } from 'redux'
import { AUTH_LOGGING_IN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE} from './actions';
import { AppNavigator } from './appnavigator'
import { login } from './utils/api-client';
import { NavigationActions } from 'react-navigation';
import { LoginAttemptStatus } from './constants';

const authInitialState = {
  isLoggedIn: false,
  jwt: '',
  isRequesting: false,
  loginAttemptStatus: null
}

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case AUTH_LOGGING_IN:
      return Object.assign({}, state, {
        isLoggedIn: false,
        jwt: '',
        isRequesting: true,
        loginAttemptStatus: LoginAttemptStatus.UNKNOWN
      });
      case AUTH_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isLoggedIn: true,
          jwt: action.jwt,
          isRequesting: false,
          loginAttemptStatus: LoginAttemptStatus.SUCCESS
        });
      case AUTH_LOGIN_FAILURE:
        return Object.assign({}, state, {
          isLoggedIn: false,
          jwt: '',
          isRequesting: false,
          loginAttemptStatus: LoginAttemptStatus.FAIL
        });
    default:
      return state
  }
}


const secondAction = AppNavigator.router.getActionForPathAndParams('login');
const navInitialState = AppNavigator.router.getStateForAction(secondAction);

function navReducer (state=navInitialState, action) {
  // const nextState = AppNavigator.router.getStateForAction(action, state);
  let nextState;
  switch (action.type) {
    // This case is a bit hacky and magical.  I got it from console.log output
    // by logging action when the app started.  Without it we get weird stuff.
    // Like a navigate back option on the very first screen displayed... dumb.
    case '@@redux/INIT':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    default:
       nextState = AppNavigator.router.getStateForAction(action, state);
       break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const worrywortClientReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  //batchList: batchListReducer,
});
export default worrywortClientReducer;
