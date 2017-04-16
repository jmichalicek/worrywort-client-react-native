import Config from 'react-native-config'

const apiUrl = Config.API_URL || "http://localhost:4000/graphql/v1/";

// TODO: use Apollo for this stuff at some point - for now, just make it work

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
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mutation)
    })
    .then((response) => response.json());
}

export function getAllBatches(token, url = apiUrl) {
  const query = {
    query: "query getBatches {batches {name, brew_date} }"
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(query)
  }).then((response) => response.json());
}
