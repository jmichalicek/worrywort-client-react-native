export const APP_TITLE = 'WorryWort';

// route/view names
export const ViewRoutes = {
  FERMENTER_LIST: 'fermenterList',
  FERMENTER_EDIT: 'fermenterEdit',
  BATCH_LIST: 'batchList',
  LOGIN: 'login'
};

export const LoginAttemptStatus = {
  UNKNOWN: null,
  SUCCESS: 'success',
  FAIL: 'failure'
}

// must be a better way to do this than keeping these in sync with the server...
export const FermenterTypes = {
  BUCKET: 'BUCKET',
  CARBOY: 'CARBOY',
  CONICAL: 'CONICAL'
}

export const VolumeUnits = {
  GALLONS: 'GALLONS',
  LITERS: 'LITERS'
}
