batchimport React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button, Picker, Switch, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Row from '../batch-list-row';
import { getBatch, createBatch, updateBatch } from '../../utils/api-client';
import { BatchTypes, VolumeUnits, styles } from '../../constants';

class EditBatch extends Component {
  // TODO: Make this a function, get at whether we have a batch or not and set to
  // Adding or Editing Batch
  // no headerRight button.  react-navigation does not implement nav in a way which
  // sanely lets you put a button, such as a save button, which needs to operate on
  // current state/props. :
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Batch',
    // headerRight: <Button title={"Save"} onPress={(navigation) => {console.log(navigation.state)}} />
  });

  constructor(props) {
    super(props);
    const defaultBatch = {
      name: '', volume: '', type: 'BUCKET', units: 'GALLONS',
      isActive: true
    }
    let f = this.props.batch || defaultBatch;
    // TODO: improve this whole thing to use state.batch as an immutablejs object
    this.state = {
      ...f,
      requestingBatch: false,
      saveSuccess: false,
      saveError: false,
      editingExisting: !!(this.props.batch && this.props.batch.id),
      batchId: f.id
    };
  }

  // batches in Redux store version
  componentWillReceiveProps(nextProps) {
    // should this go into componentDidUpdate and use this.props?
    if (nextProps.auth.jwt && !this.state.isRequesting && nextProps.batchId && !this.state.batch) {
      this.loadBatch(nextProps.auth.jwt);
    }
  }

  componentDidMount() {
    // mounting happens different with react-native 0.44 and react-navigation
    // so we need to look these up here or maybe just do it in render?  that way
    // a little loading thing could be displayed
    if (this.props.auth.jwt && !this.state.isRequesting && this.props.batchId && !this.state.batch) {
      this.loadBatch(this.props.auth.jwt);
    }
  }

  setNameFromInput = (name) => {
    this.setState({name: name});
  }

  setBatchUnits = (units) => {
    this.setState({units: units});
  }

  setBatchVolume = (volume) => {
    this.setState({volume: volume});
  }

  setDescription = (description) => {
    this.setState({description: description});
  };


  isUpdating = () => {
    return !!this.state.batchId
  };

  _volumeFieldDisplayValue = () => {
    if (typeof this.state.volume !== "string") {
      return this.state.volume.toString();
    }
    return this.state.volume;
  }

  /* Make request to add a batch */
  addBatch = () => {
    // TODO:
    // hacky kludge for volume.  Finally a reason to use a real graphql client
    // to autoconvert these as they are requested elsewhere
    const batch = {
      name: this.state.name,
      volume: typeof this.state.volume === "string" ? parseFloat(this.state.volume) : this.state.volume,
      type: this.state.type,
      units: this.state.units,
      isActive: this.state.isActive,
      description: this.state.description
    }
    createBatch(batch, this.props.auth.jwt).then((responseJson) => {

      // { data: { createBatch: { id: '1' } } }
      if (responseJson.data && responseJson.data.createBatch && responseJson.data.createBatch.id) {
        this.setState({
          saveSuccess: true,
          saveError: false,
          batchId: responseJson.data.createBatch.id,
          editingExisting: true
        });
      }
    }).catch((error) => {
        console.log(error);
        this.setState({saveSuccess: false, saveError: true})
    });
  };

  /* Make request to update a batch */
  editBatch = () => {
    // TODO:
    // hacky kludge for volume.  Finally a reason to use a real graphql client
    // to autoconvert these as they are requested elsewhere
    const batch = {
      name: this.state.name,
      volume: typeof this.state.volume === "string" ? parseFloat(this.state.volume) : this.state.volume,
      type: this.state.type,
      units: this.state.units,
      isActive: this.state.isActive,
      description: this.state.description
    }
    updateBatch(this.state.batchId, batch, this.props.auth.jwt).then((responseJson) => {
      // { data: { createBatch: { id: '1' } } }
      if (responseJson.data && responseJson.data.updateBatch && responseJson.data.updateBatch.id) {
        this.setState({
          saveSuccess: true,
          saveError: false,
          batchId: responseJson.data.updateBatch.id,
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
      statusMessage = <View style={styles.error}><Text>Error Saving Batch</Text></View>;
    } else if (this.state.saveSuccess) {
      statusMessage = <View style={styles.success}><Text>Batch Saved</Text></View>;
    }

    // TODO: better handling of batch type choices
    return (
      <View>
        <Text>{this.isUpdating() ? "Editing" : "Adding" }</Text>
        { statusMessage }
        <Text>Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setNameFromInput}
          value={this.state.name}
        />

        <Text>Volume Units</Text>
        <Picker selectedValue={this.state.units}
          onValueChange={this.setBatchUnits}>
          <Picker.Item label="Gallons" value={VolumeUnits.GALLONS} />
          <Picker.Item label="Liters" value={VolumeUnits.LITERS} />
        </Picker>

        <Text>Volume</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={this.setBatchVolume}
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

        <Button title="Save" onPress={this.isUpdating() ? this.editBatch : this.addBatch} />
      </View>);
  }

  loadBatch(jwt = null, batchId = null) {
    jwt = jwt || this.props.auth.jwt;
    batchId = batchId || this.props.batchId;
    getBatch(batchId, jwt).then((responseJson) => {
      const retrievedBatch = responseJson.data.batch;
      this.setState({
        batch: retrievedBatch,
      });
    });
  }
};

EditBatch.propTypes = {
  batch: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  // nav: PropTypes.object.isRequired,
};


const mapStateToProps = (state, props) => {
  // batch we need for props should be in props.navigation.state.params
  return {
    auth: state.auth,
    navigation: props.navigation,
    ...props.navigation.state.params
  }
};


export default connect(mapStateToProps)(EditBatch);
