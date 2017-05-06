import React from 'react';
import { StyleSheet, Text, Navigator, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import brewbaseClientReducer from './reducers'
import BatchList from './containers/batch-list';
import Login from './containers/login';
import DrawerLayout from './components/android/drawer-layout';
import { routes, loggedOutRoutes, loggedInRoutes } from './nav-routes';

let store = createStore(
  brewbaseClientReducer,
  applyMiddleware(
    thunk
  )
);

// bad idea?
// apollog seems to be adding a lot of overhead I don't currently need
// let client = createClient();

export default class BrewbaseClient extends React.Component {
  render() {
    // const routes = [
    //   {name: 'login', index: 0, displayName: 'Login'},
    //   {name: 'batchList', index: 1, shouldRequestBatches: true, displayName: 'Batches'}
    // ];

    return(
      <Navigator initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.navigatorRenderScene}
        />);
  }

  navigatorRenderScene(route, navigator) {
    let toRender = null;
    const state = store.getState();

    switch (route.name) {
      case 'login' || !state.auth.isLoggedIn:
        toRender = <Login styles={styles} title="login" username="" password="" store={store} navigator={navigator} />;
        navItems = loggedOutRoutes.slice();
        break;
      case 'batchList':
        // better way to handle shouldRequestBatches?  can passProps override that somehow?
        toRender = <BatchList store={store} navigator={navigator} style={styles.container} shouldRequestBatches={route.shouldRequestBatches} />;
        navItems = loggedInRoutes.slice();
        break;
      default:
        break;
    }
    return (
      <DrawerLayout store={store} navigator={navigator} styles={styles} navItems={navItems} currentRoute={route}>
        {toRender}
      </DrawerLayout>
    );
  }

}

AppRegistry.registerComponent('BrewbaseClient', () => BrewbaseClient);

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
