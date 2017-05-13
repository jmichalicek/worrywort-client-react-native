import React, { Component,  } from 'react';
import { View, DrawerLayoutAndroid, Text, FlatList, TouchableHighlight } from 'react-native';
// import PropTypes from 'prop-types';
import {PropTypes} from 'react';

import ToolBar from '../toolbar/toolbar';
import { routes, loggedOutRoutes, loggedInRoutes } from '../../nav-routes'; // or should I pass thse in?

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    // if (this.props && this.props.auth && this.props.auth.isLoggedIn) {
    //   navItems = loggedInRoutes.slice();
    // } else {
    //   navItems = loggedOutRoutes.slice();
    // }
    // this.state = {
    //   navItems: navItems
    // };
  }

  _onPress(route) {
    /* If navigating to a different route, do it
     * If navigating to the current view, just close the drawer
     */
    if (route !== this.props.currentRoute) {
      this.props.navigator.push(route);
    } else {
      this.refs['DRAWER'].closeDrawer();
    }
  }
  render() {
    // TODO: Seems like FlatList should work here, but it's blowing up
    // let navigationView = (
    //   <FlatList
    //     data={this.state.navItems}
    //     renderItem={
    //       ({item}) => <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>{item.displayName}</Text>
    //     }
    //   />
    // );
    let rows = [];
    this.props.navItems.forEach((item) => {
      rows.push(
        <TouchableHighlight onPress={this._onPress.bind(this, item)}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>{item.displayName}</Text>
        </TouchableHighlight>
      );
    });
    const navigationView = (
      <View>
        {rows}
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={this.props.drawerWidth}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER'}>
          <ToolBar
            store={this.props.store}
            navigator={this.props.navigator}
            styles={this.props.styles}
            sidebarRef={() => this._setDrawer()} />
          {this.props.children}

      </DrawerLayoutAndroid>
    );
  }

  // from http://stackoverflow.com/a/38189572/482999
  _setDrawer() {
   this.refs['DRAWER'].openDrawer();
  }
}

NavigationDrawer.propTypes = {
  drawerWidth: PropTypes.number,
  drawerBackgroundColor: PropTypes.string,
  store: PropTypes.object,
  navigator: PropTypes.object,
  styles: PropTypes.object,
};

NavigationDrawer.defaultProps = {
  drawerWidth: 300,
  drawerBackgroundColor: 'rgba(0,0,0,0.5)',
  store: null,
  navigator: null,
  styles: {}
};
