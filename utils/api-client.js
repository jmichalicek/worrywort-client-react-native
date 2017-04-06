import Config from 'react-native-config'

const apiUrl = Config.API_URL || "http://localhost:4000/graphql/v1/";


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

export function login(username, password, url = apiUrl) {
  // TODO: Handle errors properly!  here or in calling code
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
    .then((response) => response.json());
    // move the rest elsewhere so that it can be handled by calling code
    // .then((responseJson) => {
    //     // need to handle errors, but here is good handling
    //     // console.log(responseJson);
    //     var token = responseJson.data.login.token;
    //     console.log(token);
    //     return token;
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}
