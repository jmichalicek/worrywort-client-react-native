import React, { Component,  } from 'react';
import { Image, View, TextInput, Text, Button } from 'react-native';
import { doLogin } from '../actions';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLoginButton (username, password, store) {
    console.log("username: " + username);
    console.log("password: " + password);
    this.props.store.dispatch(doLogin(username, password));
    // need a listener for the change... not sure if that goes here
    // or if it should go elsewhere
    // http://redux.js.org/docs/api/Store.html#subscribe
    // or is there another way to get at the current state by making
    // the component update, etc.?
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // do nav here based on http://stackoverflow.com/a/36910242
  //   // but it does not get called after the dispatch
  //   if(nextState && nextState.auth && nextState.auth.loggedIn) {
  //     console.log('pushing to list');
  //     this.props.navigator.push(routeStack[1]);
  //     return false;
  //   }
  //   console.log('what');
  //   return true;
  // }

  render() {
    var username = this.state.username;
    var password = this.state.password;

    return (
      <View>
        <Text>Username:</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
        />
        <Text>Password:</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
        <Button title="Login" color="blue" accessibilityLabel="Login"
            onPress={() => this.handleLoginButton(username, password)}
        />
      </View>
    );
  }
}
