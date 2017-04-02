import { combineReducers } from 'redux'
import { DO_LOGIN } from './actions';

const initialState = {
    auth: {
        loginUrl: '',
        loggedIn: false,
        jwt: ''
    },
    // brewBatches: []
}


// this obviously needs to live elsewhere in the end
// AWAIT IS NOT AWAITING HERE!
// async function doLogin(username, password, url) {
//     var mutation = {
//     query: "mutation doLogin { login(email: \"" + username + "\", password: \"" + password + "\") {token}}"
// }
//     try {
//         console.log("mutation is");
//         console.log(mutation);
//         let response = fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(mutation)
//         });
//         let responseJson = await response.json();
//         console.log(responseJson);
//         // console.log(responseJson.data.login.token);
//         return responseJson.data.login.token;
//     } catch(error) {
//         console.log(error);
//     }
// }

function doLogin(username, password, url) {
    var mutation = {
        query: "mutation doLogin { login(email: \"" + username + "\", password: \"" + password + "\") {token}}"
    }
    // console.log("mutation is");
    // console.log(mutation);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mutation)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // need to handle errors, but here is good handling
        // console.log(responseJson);
        return responseJson.data.login.token;
    })
    .catch((error) => {
        console.log(error);
    });
}


function loginReducer(state = {}, action) {
    switch (action.type) {
        case DO_LOGIN:
            return Object.assign({}, state, {
                loggedIn: true,
                jwt: doLogin(action.username, action.password, action.loginUrl)
            });
        default:
            return state
    }
}

// just one now, but there will be more
const brewbaseClient = combineReducers({loginReducer});
export default brewbaseClient;
