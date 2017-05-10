import React, { Component,  } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { batchListRequest, batchListReceived, requestBatchList } from '../../actions';
import { getAllBatches } from '../../utils/api-client';

class BatchList extends Component {
  static navigationOptions = {
    title: 'Your Batches',
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      batches: [],
      dataSource: ds.cloneWithRows([]) , // use initialState for this?
      isRequesting: false,
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.jwt && !this.state.isRequesting && nextProps.shouldRequestBatches) {
      this.loadBatches(nextProps.auth.jwt);
    }
  }

  componentDidMount() {
    // mounting happens different with react-native 0.44 and react-navigation
    // so we need to look these up here or maybe just do it in render?  that way
    // a little loading thing could be displayed
    if (this.props.auth.jwt && !this.state.isRequesting && this.props.shouldRequestBatches) {
      this.loadBatches(this.props.auth.jwt);
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

const mapStateToProps = (state, props) => {
  // return {
  //   auth: state.auth,
  //   navigation: state.navigation
  // }
  return {...state, ...props.navigation.state.params};
};

export default connect(mapStateToProps)(BatchList);
