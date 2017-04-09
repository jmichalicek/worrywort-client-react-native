import React, { Component,  } from 'react';
import { View, Text } from 'react-native';

export default class BatchListRow extends Component {
  constructor(props) {
    super(props);
    console.log("in listrow");
    console.log(Object.keys(props));
  }

  render() {
    return (
        <Text>{this.props.name}</Text>
      );
  }
}
