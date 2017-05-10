import React, { Component,  } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import Row from '../fermenter-list-row';
import { getAllFermenters } from '../../utils/api-client';

class FermenterList extends Component {
  static navigationOptions = {
    title: 'Your Fermenters',
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      fermenters: [],
      dataSource: ds.cloneWithRows([]) , // use initialState for this?
      isRequesting: false,
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    //TODO: May need to be smarter about requesting fermenters.   Maybe a "shouldRequest"
    if (nextProps.auth.jwt && !this.state.isRequesting && this.props.fermenters.lengh < 1) {
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

  render() {
    var dataSource = this.state.dataSource;
    return (
      <View>
        <Text>Your Fermenters:</Text>
        <ListView dataSource={dataSource} renderRow={(rowData) => <Row fermenter={rowData} />} />
      </View>);
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

// import BatchList from '../components/scenes/batch-list';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    navigation: state.navigation
    //batchList: state.batchList
  }
};

// const BatchListLink = connect(
//   mapStateToProps
// )(BatchList);

export default connect(mapStateToProps)(FermenterList);
