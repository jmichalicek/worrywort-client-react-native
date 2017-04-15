import Config from 'react-native-config'
import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';

const apiUrl = Config.API_URL || "http://localhost:4000/graphql/v1/";


// // Apollo seems to be a lot of overhead and boilerplate that I do not currently need
// export function createClient(url = apiUrl) {
//   const networkInterface = createNetworkInterface({
//     uri: apiUrl,
//   });
//
//   // get jwt from asyncstorage and THEN do this in the .then()
//   // should be straightforward if I get async/await working
//   networkInterface.use([{
//     applyMiddleware(req, next) {
//       if (!req.options.headers) {
//         req.options.headers = {};  // Create the header object if needed.
//       }
//
//       // get the authentication token from local storage if it exists
//       req.options.headers.authorization = token ? `Bearer ${token}` : null;
//       next();
//     }
//   }]);
//
//   return new ApolloClient({
//     networkInterface: networkInterface,
//   });
// }
// TODO: use Apollo for this stuff

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
