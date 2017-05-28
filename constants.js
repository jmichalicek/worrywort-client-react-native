export const APP_TITLE = 'WorryWort';

// route/view names
export const ViewRoutes = {
  FERMENTER_LIST: 'fermenterList',
  FERMENTER_EDIT: 'fermenterEdit',
  BATCH_LIST: 'batchList',
  BATCH_EDIT: 'batchEdit',
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

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
  NUMERIC: 'numeric',
  PHONE_PAD: 'phone-pad'
};
