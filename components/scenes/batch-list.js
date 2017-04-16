import React, { Component,  } from 'react';
import { View, Text, ListView } from 'react-native';
import Row from '../batch-list-row';
import { batchListRequest, batchListReceived, requestBatchList } from '../../actions';
import { getAllBatches } from '../../utils/api-client';

export default class BatchListScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      batches: [],
      dataSource: ds.cloneWithRows([]) , // use initialState for this?
      requestingBatches: false,
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    // should this go into componentDidUpdate and use this.props?
    if (nextProps.auth.jwt && !this.state.isRequesting && nextProps.shouldRequestBatches) {
      this.loadBatches(nextProps.auth.jwt);
    }
  }

  render() {
    var dataSource = this.state.dataSource;
    return (
      <View>
        <Text>Your Batches:</Text>
        <ListView dataSource={dataSource} renderRow={(rowData) => <Row {...rowData} />} />
      </View>);
  }

  loadBatches(jwt = null) {
    jwt = jwt || this.props.auth.jwt;
    getAllBatches(jwt).then((responseJson) => {
      const retrievedBatches = responseJson.data.batches.slice();
      this.setState({
        batches: retrievedBatches,
        dataSource: this.state.dataSource.cloneWithRows(retrievedBatches),
        shouldRequestBatches: false
      });
    });
  }
}
