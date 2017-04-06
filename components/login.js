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

  handleLoginButton (username, password) {
    this.props.store.dispatch(doLogin(username, password));
  }

  componentWillReceiveProps(nextProps) {
    // TODO: I bet this needs some cleanup and some testing around these checks before navigating!!
    // TODO: and eventually less error prone routing
    const routeStack = nextProps.navigator.getCurrentRoutes();
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn && nextProps.auth.jwt && !nextProps.auth.isRequesting) {
      nextProps.navigator.push(routeStack[1]);
    }
  }

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
