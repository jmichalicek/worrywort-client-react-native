export const DO_LOGIN = 'DO_LOGIN';

// just copied from http://redux.js.org/docs/basics/Actions.html
// I assume this needs to actually do something, like login
// and maybe return or set the jwt in a store.
export function doLogin(username, password) {
    return {type: DO_LOGIN, username, password}
}
