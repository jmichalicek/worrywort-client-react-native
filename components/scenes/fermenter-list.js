import React, { Component } from 'react';
import { View, Text, ListView, Button, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { styles as s } from "react-native-style-tachyons";

import Row from '../fermenter-list-row';
import { ViewRoutes } from '../../constants';
import { getAllFermenters } from '../../utils/api-client';


class FermenterList extends Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: 'Your Fermenters',
  //   headerRight: <Button title="Add" onPress={() =>{
  //     navigation.navigate('fermenterEdit')}}/>
  // });

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Your Fermenters',
    headerRight: <Button title="Add" onPress={() =>{
      navigation.dispatch(
        NavigationActions.navigate(
          { routeName: ViewRoutes.FERMENTER_EDIT }
        )
      )}}/>
  });

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}
    );
    this.state = {
      fermenters: [],
      dataSource: ds.cloneWithRows([]) , // use initialState for this?
      isRequesting: false,
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    //TODO: May need to be smarter about requesting fermenters.   Maybe a "shouldRequest"
    if (nextProps.auth.jwt && !this.state.isRequesting && this.state.fermenters.length < 1) {
      this.loadFermenters(nextProps.auth.jwt);
    }
  }

  componentDidMount() {
    // mounting happens different with react-native 0.44 and react-navigation
    // so we need to look these up here or maybe just do it in render?  that way
    // a little loading thing could be displayed
    if (this.props.auth.jwt && !this.state.isRequesting) {
      this.loadFermenters(this.props.auth.jwt);
    }
  }

  _onClickAddButton() {

  }

  _renderListRow(rowData) {
    return <Row fermenter={rowData} />
  }

  render() {
    var dataSource = this.state.dataSource;
    const refreshControl = <RefreshControl refreshing={this.state.isRequesting}
       onRefresh={this._onRefresh} enabled={true} progressViewOffset={-15}  />;
    return (
      <ScrollView refreshControl={refreshControl}>
        <ListView dataSource={dataSource} enableEmptySections={true}
                  renderRow={this._renderListRow}
                  />
      </ScrollView>);
  }

  _onRefresh = () => {
    this.setState({isRequesting: true});
    this.loadFermenters(this.props.auth.jwt);
  }

  loadFermenters(jwt = null) {
    this.setState({isRequesting: true});
    jwt = jwt || this.props.auth.jwt;
    getAllFermenters(jwt).then((responseJson) => {
      const retrievedFermenters = responseJson.data.fermenters.slice();
      this.setState({
        fermenters: retrievedFermenters,
        dataSource: this.state.dataSource.cloneWithRows(retrievedFermenters),
        isRequesting: false
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

export default connect(mapStateToProps)(FermenterList);
