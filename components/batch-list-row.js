import React, { Component,  } from 'react';
import { View, Text } from 'react-native';

export default class BatchListRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Text>{this.props.name}</Text>
      );
  }
}
