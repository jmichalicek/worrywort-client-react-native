import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Picker, Switch, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { getFermenter, addFermenter } from '../../utils/api-client';
import { FermenterTypes, VolumeUnits, styles } from '../../constants';

class EditFermenter extends Component {
  // TODO: Make this a function, get at whether we have a fermenter or not and set to
  // Adding or Editing Fermenter
  // no headerRight button.  react-navigation does not implement nav in a way which
  // sanely lets you put a button, such as a save button, which needs to operate on
  // current state/props. :
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Fermenter',
    // headerRight: <Button title={"Save"} onPress={(navigation) => {console.log(navigation.state)}} />
  });

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
      saveSuccess: false,
      saveError: false,
      editingExisting: !!(this.props.fermenter && this.props.fermenter.id)
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
    this.setState({volume: parseFloat(volume)});
  }

  setDescription = (description) => {
    this.setState({description: description});
  }

  setIsActive = (isActive) => {
    this.setState({isActive: isActive});
  }

  saveDetails = () => {
    const fermenter = {
      name: this.state.name,
      volume: this.state.volume,
      type: this.state.type,
      units: this.state.units,
      isActive: this.state.isActive,
      description: this.state.description
    }
    addFermenter(fermenter, this.props.auth.jwt).then((responseJson) => {
      console.log(responseJson);
      // { data: { createFermenter: { id: '1' } } }
      if (data && data.createFermenter && data.createFermenter.id) {
        this.setState({
          saveSuccess: true,
          saveError: false,
          id: data.createFermenter.id,
          editingExisting: true
        });
      }
    }).catch((error) => {
        console.log(error);
        this.setState({saveSuccess: false, saveError: true})
    });
  };

  render() {
    let statusMessage = null;
    if (this.state.saveError) {
      statusMessage = <View style={styles.error}><Text>Error Saving Fermenter</Text></View>;
    } else if (this.state.saveSuccess) {
      statusMessage = <View style={styles.success}><Text>Fermenter Saved</Text></View>;
    }

    // TODO: better handling of fermenter type choices
    return (
      <View>
        <Text>{this.state.editingExisting ? "Editing" : "Adding" }</Text>
        { statusMessage }
        <Text>Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setNameFromInput}
          value={this.state.name}
        />
        <Text>Fermenter Type</Text>
        <Picker selectedValue={this.state.type}
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onValueChange={this.setFermenterType}>
          <Picker.Item label="Bucket" value={FermenterTypes.BUCKET} />
          <Picker.Item label="Carboy" value={FermenterTypes.CARBOY} />
          <Picker.Item label="Conical" value={FermenterTypes.CONICAL} />
        </Picker>

        <Text>Volume Units</Text>
        <Picker selectedValue={this.state.units}
          onValueChange={this.setFermenterUnits}>
          <Picker.Item label="Gallons" value={VolumeUnits.GALLONS} />
          <Picker.Item label="Liters" value={VolumeUnits.LITERS} />
        </Picker>

        <Text>Volume</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setFermenterVolume}
          value={this.state.volume}
          keyboardType='numeric'
        />

        <Text>Short Description</Text>
        <TextInput
          style={{height: 80, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setDescription}
          value={this.state.description}
          multiline={true}
        />

        <Text>Make Fermenter Active</Text>
        <Switch onValueChange={this.setIsActive}
          style={{marginBottom: 10}}
          value={this.state.isActive} />

        <Button title="Save" onPress={this.saveDetails} />
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

// import BatchList from '../components/scenes/batch-list';

const mapStateToProps = (state) => {
  // are nav and navigation duplicates?  Or is one old, from the old built in but now removed
  // react native navigation?
  return {
    auth: state.auth,
    navigation: state.navigation,
    // nav: state.nav,
  }
};


export default connect(mapStateToProps)(EditFermenter);
