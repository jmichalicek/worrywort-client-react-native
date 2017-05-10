import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { getFermenter, addFermenter } from '../../utils/api-client';

class EditFermenter extends Component {
  static navigationOptions = {
    title: 'Fermenter',
  };

  constructor(props) {
    super(props);

    this.state = {
      fermenter: this.props.fermenter || null,
      requestingFermenter: false,
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    // should this go into componentDidUpdate and use this.props?
    if (nextProps.auth.jwt && !this.state.isRequesting && nextProps.fermenterId && !this.state.fermenter) {
      this.loadFermenter(nextProps.auth.jwt);
    }
  }

  componentDidMount() {
    // mounting happens different with react-native 0.44 and react-navigation
    // so we need to look these up here or maybe just do it in render?  that way
    // a little loading thing could be displayed
    if (this.props.auth.jwt && !this.state.isRequesting && this.props.fermenterId && !this.state.fermenter) {
      this.loadFermenter(this.props.auth.jwt);
    }
  }

  render() {
    var dataSource = this.state.dataSource;
    return (
      <View>
        <Text>Your Fermenters:</Text>
        <ListView dataSource={dataSource} renderRow={(rowData) => <Row {...rowData} />} />
      </View>);
  }

  loadFermenter(jwt = null, fermenterId = null) {
    jwt = jwt || this.props.auth.jwt;
    fermenterId = fermenterId || this.props.fermenterId;
    getFermenter(fermenterId, jwt).then((responseJson) => {
      const retrievedFermenter = responseJson.data.fermenter;
      this.setState({
        fermenter: retrievedFermenter,
      });
    });
  }
}

EditFermenter.propTypes = {
  fermenterId: PropTypes.Integer,
  fermenter: PropType.object,
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

// import BatchList from '../components/scenes/batch-list';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    navigation: state.navigation
    //batchList: state.batchList
  }
};


export default connect(mapStateToProps)(FermenterList);
