import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Picker, Switch, KeyboardAvoidingView } from 'react-native';

import { styles as s } from "react-native-style-tachyons";

import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { getFermenter, createFermenter, updateFermenter } from '../../utils/api-client';
import { FermenterTypes, VolumeUnits, styles } from '../../constants';

class EditFermenter extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    params = navigation.state.params;
    // onPress MUST have a function, so we either give it a real one or a no-op
    const saveFermenter = (params && 'saveFermenter' in params) ? params.saveFermenter : () => {};
    const saveButton = <Button title={"Save"} onPress={saveFermenter} disabled={!saveFermenter} />
    return ({
      title: 'Fermenter',
      headerRight: saveButton
  })};

  constructor(props) {
    super(props);
    const defaultFermenter = {
      name: '', volume: null, type: 'BUCKET', units: 'GALLONS',
      isActive: true
    }
    let f = this.props.fermenter || defaultFermenter;
    // TODO: improve this whole thing to use state.fermenter as an immutablejs object
    this.state = {
      fermenter: Object.assign({}, f),
      requestingFermenter: false,
      saveSuccess: false,
      saveError: false,
      fermenterId: f.id
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

    // make sure our save button in the header works by attaching a function to it
    this.props.navigation.setParams({
      saveFermenter: this.saveFermenter
    });
    // mounting happens different with react-native 0.44 and react-navigation
    // so we need to look these up here or maybe just do it in render?  that way
    // a little loading thing could be displayed
    if (this.props.auth.jwt && !this.state.isRequesting && this.props.fermenterId && !this.state.fermenter) {
      this.loadFermenter(this.props.auth.jwt);
    }
  }

  setNameFromInput = (name) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {name: name})}
    });
  }

  setFermenterType = (type) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {type: type})}
    });
  }

  setFermenterUnits = (units) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {units: units})}
    });
  }

  setFermenterVolume = (volume) => {
    this.setState((prevState, props) => {
      const floatVolume = typeof volume === "string" ? parseFloat(volume) : volume
      return {fermenter: Object.assign({}, prevState.fermenter, {volume: floatVolume})}
    });
  }

  setDescription = (description) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {description: description})}
    });
  };

  setIsActive = (isActive) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {isActive: isActive})}
    });
  };

  setId = (id) => {
    this.setState((prevState, props) => {
      return {fermenter: Object.assign({}, prevState.fermenter, {id: id})}
    });
  };

  isUpdating = () => {
    return !!this.state.fermenter.id
  };

  _volumeFieldDisplayValue = () => {
    if (typeof this.state.fermenter.volume !== "string") {
      return this.state.fermenter.volume.toString();
    }
    return this.state.fermenter.volume;
  }

  /* Make request to add a fermenter */
  prepareFermenter = (fermenter) => {
    /* Prepare the fermenter for create/update in GraphQL API
     * Ensure correct data types, etc
     */
     let preparedFermenter = Object.assign({}, this.state.fermenter);
     if (typeof preparedFermenter.volume === "string") {
       preparedFermenter.volume = parseFloat(preparedFermenter.volume);
     }
     return preparedFermenter;
  };

  addFermenter = () => {
    // TODO:
    // hacky kludge for volume.  Finally a reason to use a real graphql client
    // to autoconvert these as they are requested elsewhere
    // const fermenter = {
    //   name: this.state.name,
    //   volume: typeof this.state.volume === "string" ? parseFloat(this.state.volume) : this.state.volume,
    //   type: this.state.type,
    //   units: this.state.units,
    //   isActive: this.state.isActive,
    //   description: this.state.description
    // }
    createFermenter(this.prepareFermenter(this.state.fermenter), this.props.auth.jwt).then((responseJson) => {
      // TODO: request all fermenter data back and set the fermenter as a single object
      // { data: { createFermenter: { id: '1' } } }
      if (responseJson.data && responseJson.data.createFermenter && responseJson.data.createFermenter.id) {
        this.setState({
          saveSuccess: true,
          saveError: false,
          fermenterId: responseJson.data.createFermenter.id,
        });
        this.setId(responseJson.data.createFermenter.id);
      }
    }).catch((error) => {
        console.log(error);
        this.setState({saveSuccess: false, saveError: true})
    });
  };

  /* Make request to update a fermenter */
  editFermenter = () => {
    updateFermenter(this.prepareFermenter(this.state.fermenter), this.props.auth.jwt).then((responseJson) => {
      // { data: { createFermenter: { id: '1' } } }
      if (responseJson.data && responseJson.data.updateFermenter && responseJson.data.updateFermenter.id) {
        this.setState({
          saveSuccess: true,
          saveError: false,
          fermenterId: responseJson.data.updateFermenter.id,
        });
      }
    }).catch((error) => {
        console.log(error);
        this.setState({saveSuccess: false, saveError: true})
    });
  };

  saveFermenter = () => {
    if (this.isUpdating()) {
      return this.editFermenter();
    } else {
      return this.addFermenter();
    }
  }

  render() {

    const textInputStyle = [s.b__gray, s.h3, s.mb3, s.ba, s.black];
    const multilineTextInputStyle = [s.b__gray, s.ba, s.tl, {textAlignVertical:  'top'}];
    const saveMessageStyle = [s.ma1, s.mb2, s.jcfs, s.pa2, s.h3, s.mb1, s.tc];

    // if (this.state.saveError) {
    let messageText = '';
    if (this.state.saveError) {
      messageText = 'Error Saving Fermenter';
    } else if (this.state.saveSuccess) {
      messageText = 'Fermenter Saved';
    }
    let statusMessage = null;
    if (this.state.saveError || this.state.saveSuccess) {
      statusMessage =
        <View style={[...saveMessageStyle, ...(this.state.saveError ? [s.bg_red] : [s.bg_greenYellow]) ]}>
          <Text style={[s.white, s.f3]}>{ messageText }</Text>
        </View>;
    }

    // TODO: better handling of fermenter type choices
    return (
      <View>
        <Text>{this.isUpdating() ? "Editing" : "Adding" }</Text>
        { statusMessage }
        <Text>Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setNameFromInput}
          value={this.state.fermenter.name}
        />
        <Text>Fermenter Type</Text>
        <Picker selectedValue={this.state.fermenter.type}
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onValueChange={this.setFermenterType}>
          <Picker.Item label="Bucket" value={FermenterTypes.BUCKET} />
          <Picker.Item label="Carboy" value={FermenterTypes.CARBOY} />
          <Picker.Item label="Conical" value={FermenterTypes.CONICAL} />
        </Picker>

        <Text>Volume Units</Text>
        <Picker selectedValue={this.state.fermenter.units}
          onValueChange={this.setFermenterUnits}>
          <Picker.Item label="Gallons" value={VolumeUnits.GALLONS} />
          <Picker.Item label="Liters" value={VolumeUnits.LITERS} />
        </Picker>

        <Text>Volume</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setFermenterVolume}
          value={this.state.fermenter.volume}
          keyboardType='numeric'
        />

        <Text>Short Description</Text>
        <TextInput
          style={{height: 80, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setDescription}
          value={this.state.fermenter.description}
          multiline={true}
        />

        <Text>Make Fermenter Active</Text>
        <Switch onValueChange={this.setIsActive}
          style={{marginBottom: 10}}
          value={this.state.fermenter.isActive} />
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
};

EditFermenter.propTypes = {
  fermenterId: PropTypes.number,
  fermenter: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  // nav: PropTypes.object.isRequired,
};


const mapStateToProps = (state, props) => {
  // fermenter we need for props should be in props.navigation.state.params
  return {
    auth: state.auth,
    navigation: props.navigation,
    ...props.navigation.state.params
  }
};


export default connect(mapStateToProps)(EditFermenter);
