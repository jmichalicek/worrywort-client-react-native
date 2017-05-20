import React from 'react';
import { Text, AppRegistry, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import worrywortClientReducer from './reducers'

import AppWithNavigationState from './appnavigator'
import BatchList from './components/scenes/batch-list';
import FermenterList from './components/scenes/fermenter-list';
import Login from './components/scenes/login';
import { ViewRoutes } from './constants';
import './styles'

// bad idea?
// apollog seems to be adding a lot of overhead I don't currently need
// let client = createClient();

// // Can this go into colors?
// NativeTachyons.build({...colorPalette
//     /* REM parameter is optional, default is 16 */
//     // rem: screenWidth > 340 ? 18 : 16
// }, StyleSheet);

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
