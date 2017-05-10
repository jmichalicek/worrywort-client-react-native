import React from 'react';
import { StyleSheet, Text, Navigator, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import worrywortClientReducer from './reducers'

import AppWithNavigationState from './appnavigator'
import BatchList from './containers/batch-list';
import FermenterList from './components/scenes/fermenter-list';
import Login from './components/scenes/login';
import DrawerLayout from './components/android/drawer-layout';
import { ViewRoutes } from './constants';

// bad idea?
// apollog seems to be adding a lot of overhead I don't currently need
// let client = createClient();

class WorryWortClient extends React.Component {
  store = createStore(
    worrywortClientReducer,
    applyMiddleware(
      thunk
    )
  );

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
};

AppRegistry.registerComponent('WorryWortClient', () => WorryWortClient);

export default WorryWortClient;

const styles = StyleSheet.create({
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
