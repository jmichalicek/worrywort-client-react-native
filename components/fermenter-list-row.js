import React, { Component,  } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { styles as s } from "react-native-style-tachyons";

import { ViewRoutes } from '../constants';

export class FermenterListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  _onPress = () => {
    const fermenter = this.props.fermenter;

    this.props.dispatch(
      NavigationActions.navigate(
        { routeName: ViewRoutes.FERMENTER_EDIT, params: {fermenter: fermenter}  }
      )
    )
  }

  _onLongPress = () => {
    this.setModalVisible(true)
  }

  // TODO: I would prefer this modal live on the fermenter-list view
  // and the TouchableHighlight live there and pass the fermenter in
  // on longpress.
  // When attempting that, setNativeProps was not behaving as expected.  I assume
  // due to use in a ListView row
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
      <Modal
        animationType={"slide"} transparent={false} visible={this.state.modalVisible}
        onRequestClose={() => {this.setModalVisible(false)}}
        transparent={false}
        style={[s.mv3]}
        >
        <View style={[s.ba, s.mt6, s.f1, s.jcc, s.aic, s.h3]}>
          <View>
            <Text style={[s.f3, s.tc, s.lh3]}>Delete Fermenter?</Text>
          </View>
        </View>
      </Modal>
        <TouchableHighlight onPress={this._onPress} onLongPress={this._onLongPress}
                            style={[s.bb, s.jcfs, s.pa2]}>
          <View>
            <Text style={[s.white]}>{this.props.fermenter.name}</Text>
            <Text>{this.props.fermenter.volume}{this.props.fermenter.units} {this.props.fermenter.type}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// do we really need the redux stuff here or could I just
// really pass nav as props?
const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    navigation: props.navigation,
  }
};

export default connect(mapStateToProps)(FermenterListRow);
