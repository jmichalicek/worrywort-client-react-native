import React, { Component,  } from 'react';
import { View, Text, ListView, Button, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { styles as s } from "react-native-style-tachyons";

import Row from '../batch-list-row';
import { batchListRequest, batchListReceived, requestBatchList } from '../../actions';
import { getAllBatches } from '../../utils/api-client';
import { ViewRoutes } from '../../constants';

class BatchList extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Your Batches',
    headerRight: <Button title="Add" onPress={() =>{
      navigation.dispatch(
        NavigationActions.navigate(
          { routeName: ViewRoutes.BATCH_EDIT }
        )
      )}}/>
  });

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      batches: [],
      dataSource: ds.cloneWithRows([]) , // use initialState for this?
      isRequesting: false,
      shouldRequestBatches: false
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
    if (this.props.auth.jwt && !this.state.isRequesting) {
      this.loadBatches(this.props.auth.jwt);
    }
  }

  render() {
    var dataSource = this.state.dataSource;
    return (
      <View>
        <Text>Your Batches:</Text>
        <ListView enableEmptySections={true} dataSource={dataSource} renderRow={(rowData) => <Row {...rowData} />} />
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
  // TODO: Am I doing this wrong?  navigation seems to always be null
  // TODO: Do I even need react-navigation integrated with redux?
  return {
    auth: state.auth,
    navigation: state.navigation,
    ...props.navigation.state.params
  }
};

export default connect(mapStateToProps)(BatchList);
