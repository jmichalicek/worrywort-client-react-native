import React from 'react';
import { StyleSheet, Text, Navigator, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import brewbaseClientReducer from './reducers'
import BatchList from './containers/batch-list';
import Login from './containers/login';
import DrawerLayout from './components/android/drawer-layout';

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
    const routes = [
      {name: 'login', index: 0},
      {name: 'batchList', index: 1, shouldRequestBatches: true}
    ];

    return(
      <Navigator initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.navigatorRenderScene}
        />);
  }

  navigatorRenderScene(route, navigator) {
    let toRender = null;
    switch (route.name) {
      case 'login':
        toRender = <Login styles={styles} title="login" username="" password="" store={store} navigator={navigator} />;
        break;
      case 'batchList':
        // better way to handle shouldRequestBatches?  can passProps override that somehow?
        toRender = <BatchList store={store} navigator={navigator} style={styles.container} shouldRequestBatches={route.shouldRequestBatches} />;
        break;
      default:
        break;
    }
    return (<DrawerLayout store={store} navigator={navigator} styles={styles}>
      {toRender}
    </DrawerLayout>);
  }

}

AppRegistry.registerComponent('BrewbaseClient', () => BrewbaseClient);

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 50,
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


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class BrewbaseClient extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
