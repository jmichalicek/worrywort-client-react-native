import React, { Component,  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { styles as s } from "react-native-style-tachyons";

import { ViewRoutes } from '../constants';

class BatchListRow extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    const batch = this.props.batch;

    this.props.dispatch(
      NavigationActions.navigate(
        { routeName: ViewRoutes.BATCH_EDIT, params: {batch: batch}  }
      )
    )
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPress} style={[s.bb, s.jcfs, s.pa2]}>
        <View>
          <Text>{this.props.batch.name}</Text>
          <Text>{this.props.batch.brewDate}</Text>
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

export default connect(mapStateToProps)(BatchListRow);
