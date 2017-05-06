
export const loggedOutRoutes = [
  {name: 'login', index: 0, displayName: 'Login'}
]

export const loggedInRoutes = [
  {name: 'batchList', index: 1, shouldRequestBatches: true, displayName: 'Batches'}
]

export const routes = [
  ...loggedOutRoutes, ...loggedInRoutes
];
