import React from 'react';
import { StyleSheet, Text, Navigator, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import worrywortClientReducer from './reducers'

import BatchList from './containers/batch-list';
import FermenterList from './components/scenes/fermenter-list';
import Login from './components/scenes/login';

import DrawerLayout from './components/android/drawer-layout';
import { ViewRoutes } from './constants';

// bad idea?
// apollog seems to be adding a lot of overhead I don't currently need
// let client = createClient();

// export default class WorryWortClient extends React.Component {
//   render() {
//     // const routes = [
//     //   {name: 'login', index: 0, displayName: 'Login'},
//     //   {name: 'batchList', index: 1, shouldRequestBatches: true, displayName: 'Batches'}
//     // ];
//
//     return (
//       <Navigator initialRoute={routes[0]}
//         renderScene={this.navigatorRenderScene}
//         initialRouteStack={routes}
//       />
//     );
//   }
//
//   navigatorRenderScene(route, navigator) {
//     let toRender = null;
//     let navItems = [];
//     const state = store.getState();
//
//     switch (route.name) {
//       case ViewRoutes.LOGIN || !state.auth.isLoggedIn:
//         toRender = <Login styles={styles} title="login" username="" password="" store={store} navigator={navigator} />;
//         navItems = loggedOutRoutes.slice();
//         break;
//       case ViewRoutes.BATCH_LIST:
//         // better way to handle shouldRequestBatches?  can passProps override that somehow?
//         toRender = <BatchList store={store} navigator={navigator} style={styles.container} shouldRequestBatches={route.shouldRequestBatches} />;
//         navItems = loggedInRoutes.slice();
//         break;
//       case ViewRoutes.FERMENTER_LIST:
//         // better way to handle shouldRequestBatches?  can passProps override that somehow?
//         toRender = <FermenterList
//           store={store} navigator={navigator} style={styles.container}
//           shouldRequestFermenters={route.shouldRequestFermenters}
//         />;
//         navItems = loggedInRoutes.slice();
//         break;
//       default:
//         break;
//     }
//     return (
//       <DrawerLayout store={store} navigator={navigator} styles={styles} navItems={navItems} currentRoute={route}>
//         {toRender}
//       </DrawerLayout>
//     );
//   }
//
// }



import AppWithNavigationState from './appnavigator'
import { Provider } from 'react-redux';

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
