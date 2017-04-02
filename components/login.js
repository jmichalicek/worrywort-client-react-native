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
        store.dispatch(doLogin(username, password));
    }

    render() {
        var username = this.state.username;
        var password = this.state.password;

        return (
            <View>
                <Text>
                    Username:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <Text>
                    Password:
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <Button title="Login" color="blue" accessibilityLabel="Login"
                    onPress={() => this.handleLoginButton(username, password, this.props.store)}
                />
            </View>

        );
    }
}
