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

function makeRequest(query, token, url) {
  // TODO: remove this, but it's so nice for dev.  maybe use a real logger.
  console.info(JSON.stringify(query));
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(query)
  });
}

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

export function getAllFermenters(token, url = apiUrl) {
  const query = {
    query: "query getFermenters {fermenters {name, id, description, type, units, volume, isActive, isAvailable } }"
  }
  return makeRequest(query, token, url).then((response) => response.json());
}

export function getFermenter(fermenterId, token, url = apiUrl) {
  const query = {
    query: "query getFermenter($id: ID!) { fermenter(id: $id) { id, name, description, type, units, volume }}",
    variables: {"id": fermenterId}
  }

  return makeRequest(query, token, url).then((response) => response.json());
};

export function addFermenter(fermenter, token, url=apiUrl) {
  const mutation = {
    query: "mutation putFermenter($description: String, $name: String!, $type: Int!, $units: Int!, $volume: Float!, $isActive: Boolean) {createFermenter(description: $description, name: $name, type: $type, units: $units, volume: $volume, is_active: $isActive) { id }}",
    variables: {
      "name": fermenter.name,
      "description": fermenter.description,
      "type": fermenter.type,
      "units": fermenter.units,
      "volume": fermenter.volume,
      "isActive": fermenter.isActive
    }
  };
  return makeRequest(mutation, token, url).then((response) => response.json());
}

export function updateFermenter(fermenterId, fermenter, token, url=apiUrl) {
  const mutation = {
    query: "mutation updateFermenter($id: Int!, $fermenter: FermenterInput!) {updateFermenter(id: $id, fermenter: $fermenter) { id }}",
    variables: {
      "id": fermenterId,
      "fermenter": fermenter
    }
  };
  return makeRequest(mutation, token, url).then((response) => response.json());
}
