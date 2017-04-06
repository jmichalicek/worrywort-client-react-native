import React from 'react';
import { StyleSheet, Text, Navigator, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import brewbaseClientReducer from './reducers'
import Login from './components/login.js';
import BatchListScene from './components/scenes/batch-list-scene';

let store = createStore(
  brewbaseClientReducer,
  applyMiddleware(
    thunk
  )
);

export default class BrewbaseClient extends React.Component {
  render() {
    const routes = [
      {name: 'login', index: 0},
      {name: 'batchList', index: 1}
    ];
    return(
      <Navigator initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.navigatorRenderScene}
        />);
  }

  navigatorRenderScene(route, navigator) {
    switch (route.name) {
      case 'login':
        return (<Login title="login" username="" password="" store={store} navigator={navigator} />);
        break;
      case 'batchList':
        console.log("got batchlist route");
        return (<BatchListScene store={store} navigator={navigator} />);
        break;
      default:
        break;
      }
  }
}

AppRegistry.registerComponent('BrewbaseClient', () => BrewbaseClient);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
