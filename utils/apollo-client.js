// import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';
// // Apollo seems to be a lot of overhead and boilerplate that I do not currently need
// to make components use it automatically, adding in redux where I don't need it, etc.
// Also need to figure out how to directly access its redux store or have it access
// my main redux store for the jwt or figure out a different way/place of setting up the auth header.
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
