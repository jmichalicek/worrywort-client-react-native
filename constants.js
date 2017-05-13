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

export const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red'
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
