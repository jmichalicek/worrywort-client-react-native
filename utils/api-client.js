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

export function getAllFermenters(token, filters = {}, url = apiUrl) {

  let fermenterArgs = '';
  for(let [key, value] of Object.entries(filters)) {
    fermenterArgs += key + ':' + value + ', ';
  }
  if (fermenterArgs) {
    fermenterArgs = '(' + fermenterArgs.trim().slice(0, -1) + ')';
  }

  const query = {
    query: "query getFermenters {fermenters" + fermenterArgs + " {name, id, description, type, units, volume, isActive, isAvailable } }"
  }
  // TODO: make volume be a float here?  It seems to be coming in as a string
  // a real graphQL client might fix that.
  return makeRequest(query, token, url).then((response) => response.json());
}

export function getFermenter(fermenterId, token, url = apiUrl) {
  const query = {
    query: "query getFermenter($id: ID!) { fermenter(id: $id) { id, name, description, type, units, volume }}",
    variables: {"id": fermenterId}
  }
  // TODO: make volume be a float here?  It seems to be coming in as a string
  // a real graphQL client might fix that.
  return makeRequest(query, token, url).then((response) => response.json());
};

export function createFermenter(fermenter, token, url=apiUrl) {
  const mutation = {
    query: "mutation putFermenter($fermenter: FermenterInput!) {createFermenter(fermenter: $fermenter) { id }}",
    variables: {
      "fermenter": fermenter
      // "name": fermenter.name,
      // "description": fermenter.description,
      // "type": fermenter.type,
      // "units": fermenter.units,
      // "volume": fermenter.volume,
      // "isActive": fermenter.isActive
    }
  };
  return makeRequest(mutation, token, url).then((response) => response.json());
}

export function updateFermenter(fermenter, token, url=apiUrl) {
  // need to strip the id for FermenterInput type
  let {id, ...fermenterInput} = fermenter;
  const mutation = {
    query: "mutation updateFermenter($id: Int!, $fermenter: FermenterInput!) {updateFermenter(id: $id, fermenter: $fermenter) { id }}",
    variables: {
      "id": id,
      "fermenter": fermenterInput
    }
  };
  return makeRequest(mutation, token, url).then((response) => response.json());
}

export function createBatch(batch, token, url=apiUrl) {
  const mutation = {
    query: "mutation createBatch($batch: BatchInput!) {createBatch(batch: $batch) { id }}",
    variables: {
      "batch": batch
    }
  };
  return makeRequest(mutation, token, url).then((response) => response.json());
}
