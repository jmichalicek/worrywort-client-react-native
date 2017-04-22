import React, { Component,  } from 'react';
import { View, DrawerLayoutAndroid, Text } from 'react-native';
import PropTypes from 'prop-types';

import ToolBar from '../toolbar/toolbar';

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('in DrawerLayout render');
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
