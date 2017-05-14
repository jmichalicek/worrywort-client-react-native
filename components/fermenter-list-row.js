import React, { Component,  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ViewRoutes } from '../../constants';

export default class BatchListRow extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    console.log('stuff');
    navigation.dispatch(
      NavigationActions.navigate(
        { routeName: ViewRoutes.FERMENTER_EDIT, params: {fermenter: fermenter}  }
      )
    )
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View>
          <Text>{this.props.fermenter.name}</Text>
          <Text>{this.props.fermenter.volume}{this.props.fermenter.units} {this.props.fermenter.type}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
