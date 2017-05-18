import React, { Component,  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { styles as s } from "react-native-style-tachyons";

import { ViewRoutes } from '../constants';

export class FermenterListRow extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    const fermenter = this.props.fermenter;

    this.props.dispatch(
      NavigationActions.navigate(
        { routeName: ViewRoutes.FERMENTER_EDIT, params: {fermenter: fermenter}  }
      )
    )
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} style={[s.bb, s.jcfs, s.pa2]}>
        <View>
          <Text style={[s.white]}>{this.props.fermenter.name}</Text>
          <Text>{this.props.fermenter.volume}{this.props.fermenter.units} {this.props.fermenter.type}</Text>
        </View>
      </TouchableHighlight>
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
