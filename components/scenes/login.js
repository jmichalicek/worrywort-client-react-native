import React, { Component,  } from 'react';
import { connect } from 'react-redux';
import { Image, View, TextInput, Text, Button, Switch } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { styles as s } from "react-native-style-tachyons";

import { doLogin } from '../../actions';
import { LoginAttemptStatus, ViewRoutes, styles } from '../../constants';


class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      stayLoggedIn: true
    };

    // try to load jwt here from async storage
  }

  handleLoginButton (username, password) {
    // this.props.dispatch due to how react-navigation handles redux
    this.props.dispatch(doLogin(username, password));
  }

  componentWillReceiveProps(nextProps) {
    // TODO: I bet this needs some cleanup and some testing around these checks before navigating!!
    // TODO: and eventually less error prone routing

    if (!this.props.auth.isLoggedIn && nextProps.auth.isLoggedIn
        && nextProps.auth.jwt && !nextProps.auth.isRequesting) {

      this.saveJwt(nextProps.auth.jwt);
      // Seems like the navAction with reset should work
      // to put this next view on a stack with nothign below it
      nextProps.dispatch(
          // NavigationActions.navigate({ routeName: ViewRoutes.BATCH_LIST, params: {shouldRequestBatches: true} })
          NavigationActions.navigate({ routeName: ViewRoutes.FERMENTER_LIST, params: {shouldRequestBatches: true} })
      );

      // const navAction = NavigationOptions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate(
      //       {routeName: ViewRoutes.BATCH_LIST, params: {shouldRequestBatches: true} }
      //     )
      //   ]
      // });
      // nextProps.dispatch(navAction);

    }
  }

  saveJwt = (jwt) => {
    // save it

  }

  passwordTextChangedHandler = (password) => {
    this.setState({password})
  };

  usernameTextChangedHandler = (username) => {
    this.setState({username})
  };

  stayLoggedInChangedHandler = (stayLoggedIn) => {
    this.setState({stayLoggedIn: stayLoggedIn})
  }

  render() {
    var username = this.state.username;
    var password = this.state.password;
    let errorDisplay = null;
    if (this.props.auth.loginAttemptStatus === LoginAttemptStatus.FAIL) {
      errorDisplay = <View style={[s.ma1, s.mb2, s.jcfs, s.pa2, s.bg_red, s.h3, s.mb1]}>
                      <Text style={[s.white]}>Error logging in</Text>
                     </View>;
    }

    return (
      <View style={[s.flx_1, s.bg_white, s.h150]}>
        { errorDisplay }
        <Text>Username:</Text>
        <TextInput
          style={[s.b__gray, s.h3, s.pb2, s.ma1, s.ba]}
          onChangeText={this.usernameTextChangedHandler}
          value={this.state.username}
        />
        <Text>Password:</Text>
        <TextInput
            style={[s.b__gray, s.h3, s.pb2, s.ma1, s.ba]}
            onChangeText={this.passwordTextChangedHandler}
            value={this.state.password}
            secureTextEntry={true}
        />
        <Button title="Login" color="blue" accessibilityLabel="Login"
            onPress={() => this.handleLoginButton(username, password)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    nav: state.nav,
    ...props
  }
};

export default connect(mapStateToProps)(Login);
