import React, { Component,  } from 'react';
import { View, Text, ListView } from 'react-native';

export default class BatchListScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      batches: ds.cloneWithRows(['row 1', 'row 2'])
    };
  }

  render() {
    var batches = this.state.batches;
    return (
      <View>
        <Text>Your Batches:</Text>
        <ListView dataSource={batches} renderRow={(rowData) => <Text>{rowData}</Text>} />
      </View>);
  }
}
