import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Picker, Switch } from 'react-native';
import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { getFermenter, addFermenter } from '../../utils/api-client';

class EditFermenter extends Component {
  // TODO: Make this a function, get at whether we have a fermenter or not and set to
  // Adding or Editing Fermenter
  static navigationOptions = {
    title: 'Fermenter',
  };

  constructor(props) {
    super(props);

    const defaultFermenter = {
      name: '', volume: '', type: 'BUCKET', units: 'GALLONS',
      isActive: true
    }
    const f = this.props.fermenter || defaultFermenter;
    this.state = {
      ...f,
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

  setNameFromInput = (name) => {
    this.setState({name: name});
  }

  setFermenterType = (type) => {
    this.setState({type: type});
  }

  setFermenterUnits = (units) => {
    this.setState({units: units});
  }

  setFermenterVolume = (volume) => {
    this.setState({volume: volume});
  }

  setDescription = (description) => {
    this.setState({description: description});
  }

  setIsActive = (isActive) => {
    this.setState({isActive: isActive});
  }

  render() {
    var dataSource = this.state.dataSource;
    // TODO: better handling of fermenter type choices
    return (
      <View>
        <Text>{this.props.fermenter ? "Editing" : "Adding" }</Text>

        <Text>Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setNameFromInput}
          value={this.state.name}
        />
        <Text>Fermenter Type</Text>
        <Picker selectedValue={this.state.type}
          onValueChange={this.setFermenterType}>
          <Picker.Item label="Bucket" value="BUCKET" />
          <Picker.Item label="Carboy" value="CARBOY" />
          <Picker.Item label="Conical" value="CONICAL" />
        </Picker>

        <Text>Volume Units</Text>
        <Picker selectedValue={this.state.units}
          onValueChange={this.setFermenterUnits}>
          <Picker.Item label="Gallons" value="GALLONS" />
          <Picker.Item label="Liters" value="LITERS" />
        </Picker>

        <Text>Volume</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setFermenterVolume}
          value={this.state.volume}
        />

        <Text>Short Description</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setDescription}
          value={this.state.description}
        />

        <Text>Make Fermenter Active</Text>
        <Switch onValueChange={this.setIsActive}
          style={{marginBottom: 10}}
          value={this.state.isActive} />
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
  fermenter: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

// import BatchList from '../components/scenes/batch-list';

const mapStateToProps = (state) => {
  // are nav and navigation duplicates?  Or is one old, from the old built in but now removed
  // react native navigation?
  return {
    auth: state.auth,
    navigation: state.navigation,
    nav: state.nav,
  }
};


export default connect(mapStateToProps)(EditFermenter);
