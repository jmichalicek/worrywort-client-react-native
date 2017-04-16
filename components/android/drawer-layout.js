import React, { Component,  } from 'react';
import { View, DrawerLayoutAndroid, Text } from 'react-native';
import PropTypes from 'prop-types'; // do I have this and do I need to include it?

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // should this go in componentDidMount()?
    // or not here at all?  Goal is to avoid showing the login
    // if the user is already logged in
    // const routeStack = this.props.navigator.getCurrentRoutes();
    // if (this.props.auth.isLoggedIn && this.props.auth.jwt && !this.props.auth.isRequesting) {
    //   console.log('pushing navigator to batch list from constructor');
    //   this.props.navigator.push(routeStack[1]);
    // }
  }

  render() {
    // TODO: make this a component and import it, I think, rather than pass as props
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I am in the Drawer!</Text>
      </View>
    );

    // TODO: Pass the actual view in as props to go inside the DrawLayoutAndroid?
    // or can I keep them separate and JUST have this attached to a nav toolbar
    // which I will pass around.
    return (
      <DrawerLayoutAndroid
        drawerWidth={this.props.drawerWidth}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

NavigationDrawer.propTypes = {
  drawerWidth: PropType.number,
  // drawerBackgroundColor: PropTypes.object,
  drawerBackgroundColor: PropTypes.string,
};

NavigationDrawer.defaultProps = {
  drawerWidth: 300,
  drawerBackgroundColor: 'rgba(0,0,0,0.5)'
};
