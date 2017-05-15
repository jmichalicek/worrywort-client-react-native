import { StyleSheet } from 'react-native';

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

export const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red'
  },
  success: {
    backgroundColor: 'green'
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  batchList: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fermenterList: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex: 1
  },
  login__input: {
    flex: 1
  },
  login__label: {
    flex: 1
  }
});
