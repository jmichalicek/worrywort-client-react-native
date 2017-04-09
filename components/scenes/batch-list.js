import React, { Component,  } from 'react';
import { View, Text, ListView } from 'react-native';
import Row from '../batch-list-row'
import { batchListRequest, batchListReceived, requestBatchList } from '../../actions'

export default class BatchListScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // batches: ds.cloneWithRows(['row 1', 'row 2'])
      batches: ds.cloneWithRows(props.batchList.batches.slice())
    };
    console.log("IN constructor");
    console.log(Object.keys(props));
    console.log(Object.keys(props.auth));

    this.loadBatches();
  }

  componentDidMount() {
    this.loadBatches();
  }

  componentWillReceiveProps(nextProps) {
    console.log("IN WILLRECEIVE");
    console.log(nextProps.batchList.isRequesting);
    console.log(nextProps.batchList.batches);
    if (!nextProps.batchList.isRequesting) {
      this.setState({
        batches: this.state.batches.cloneWithRows(nextProps.batchList.batches.slice())
      });
    }
  }

  render() {
    var batches = this.state.batches;
    return (
      <View>
        <Text>Your Batches:</Text>
        <ListView dataSource={batches} renderRow={(rowData) => <Row {...rowData} />} />
      </View>);
  }

  loadBatches() {
    console.log('called load batches');
    console.log(Object.keys(this.props));
    console.log(Object.keys(this.props.auth));
    // console.log(this.props.auth.jwt);
    const jwt = this.props.auth.jwt;
    this.props.store.dispatch(batchListRequest());
    this.props.store.dispatch(batchListReceived());
    // this.props.store.dispatch(requestBatchList(jwt));
  }
}
