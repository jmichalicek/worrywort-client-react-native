import React, { Component,  } from 'react';
import { connect } from 'react-redux';
import { Image, View, TextInput, Text, Button } from 'react-native';
import { doLogin } from '../../actions';
import { ViewRoutes } from '../../constants';
import { NavigationActions } from 'react-navigation';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLoginButton (username, password) {
    // this.props.dispatch due to how react-navigation handles redux
    this.props.dispatch(doLogin(username, password));
  }

  componentWillReceiveProps(nextProps) {
    // TODO: I bet this needs some cleanup and some testing around these checks before navigating!!
    // TODO: and eventually less error prone routing
    // const routeStack = nextProps.navigator.getCurrentRoutes();
    if (!this.props.auth.isLoggedIn && nextProps.auth.isLoggedIn
        && nextProps.auth.jwt && !nextProps.auth.isRequesting) {
      // TODO: Can I abstract the dispatching of navigate to just be a navTo(routeName)
      //  stored somewhere central?
      nextProps.dispatch(NavigationActions.navigate(
        { routeName: ViewRoutes.BATCH_LIST, params: {shouldRequestBatches: true} }));
    }
  }

  render() {
    var username = this.state.username;
    var password = this.state.password;

    return (
      <View>
        <Text>Username:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <Text>Password:</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    navigation: state.navigation
  }
};

export default connect(mapStateToProps)(Login);
