
export const loggedOutRoutes = [
  {name: 'login', index: 0, displayName: 'Login'}
]

export const loggedInRoutes = [
  {name: 'batchList', index: 1, shouldRequestBatches: true, displayName: 'Batches'},
  {name: 'fermenterList', index: 2, shouldRequestFermenters: true, displayName: 'Fermenters'}
]

export const routes = [
  ...loggedOutRoutes, ...loggedInRoutes
];
