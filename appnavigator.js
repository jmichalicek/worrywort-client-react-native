/* will need to muck with this.  it's really set up android specific
 * yet will need to be used for android, ios, web, etc
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { addNavigationHelpers, DrawerNavigator, StackNavigator } from "react-navigation";

import BatchList from './containers/batch-list';
import FermenterList from './components/scenes/fermenter-list';
import Login from './containers/login';

export const AppNavigator = StackNavigator({
  login: { screen: Login },
  fermenterList: { screen: FermenterList },
  batchList: { screen: BatchList }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
