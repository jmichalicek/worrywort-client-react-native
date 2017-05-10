'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToolbarAndroid
} from 'react-native';
//import PropTypes from 'prop-types';
import {PropTypes} from 'react';

import { APP_TITLE } from '../../constants';

var nativeImageSource = require('nativeImageSource');

class ToolBar extends Component {
  // render() {
  //   var navigator = this.props.navigator;
  //    return (
  //     <ToolBarAndroid
  //       navigator={this.props.navigator}
  //       store={this.props.store}
  //       title={this.props.title}
  //       navIcon={require('./icons/ic_menu_white_24dp.png')}
  //       style={this.props.styles.toolbar}
  //       titleColor={'white'} />
  //       onIconClicked={this.props.sidebarRef} />
  //   );
  // }

  render() {
     return (
      <ToolbarAndroid
        title={this.props.title}
        style={this.props.styles.toolbar}
        onIconClicked={this.props.sidebarRef}
        navIcon={nativeImageSource({ android: 'ic_menu_black_24dp', width: 48, height: 48 })}
      />
    );
  }
};

ToolBar.propTypes = {
  title: PropTypes.string,
  store: PropTypes.object,
  navigator: PropTypes.object,
  styles: PropTypes.object,
};

ToolBar.defaultProps = {
  title: APP_TITLE,
  store: null,
  navigator: null,
  styles: {}
};

module.exports = ToolBar;
