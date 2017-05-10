import React, { Component,  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class BatchListRow extends Component {
  constructor(props) {
    super(props);
  }

  _onPress(fermenter) {
    // TODO: dispatch to go to fermenter edit (or detail?) with this fermenter
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress.bind(this, this.props.fermenter)}>
        <View>
          <Text>{this.props.fermenter.name}</Text>
          <Text>{this.props.fermenter.volume}{this.props.fermenter.units} {this.props.fermenter.type}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
