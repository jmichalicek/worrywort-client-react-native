/* will need to muck with this.  it's really set up android specific
 * yet will need to be used for android, ios, web, etc
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { addNavigationHelpers, DrawerNavigator, StackNavigator, TabNavigator } from "react-navigation";

import BatchList from './containers/batch-list';
import FermenterList from './components/scenes/fermenter-list';
import FermenterEdit from './components/scenes/edit-fermenter';
import Login from './containers/login';

const Stack = {
  login: { screen: Login },
  batchList: { screen: BatchList },
  fermenterList: { screen: FermenterList },
  fermenterEdit: { screen: FermenterEdit }
};

// TODO: May need two different DrawerRoutes setups
// one for when need to log in which just has the login
// and potential upcoming config/settings
// and second which gets swapped in after login using navigation.reset()
// https://reactnavigation.org/docs/navigators/navigation-actions#Reset
export const DrawerRoutes = {
	FirstViewStack: {
		name: 'FirstViewStack',
		screen: StackNavigator(Stack, {initialRouteName: 'login'})
	},
	SecondViewStack: {
		name: 'SecondViewStack',
		screen: StackNavigator(Stack, { initialRouteName: 'batchList' })
	},
	ThirdViewStack: {
		name: 'ThirdViewStack',
		screen: StackNavigator(Stack, { initialRouteName: 'fermenterList' })
	},
};

// export const AppNavigator =
// 	StackNavigator({
// 		Drawer: {
// 			name: 'Drawer',
// 			screen: DrawerNavigator(
// 				DrawerRoutes,
// 			),
// 		},
//     ...Stack
// 	},
// 	{
// 		headerMode: 'none'
// 	}
// );

// export const AppNavigator =
// 	TabNavigator(
//     Tabs: {
//       name: 'Stack',
//       screen: StackNavigator(Stack, {initialRouteName: 'login'})
//     }
// 	);


export const AppNavigator =
  DrawerNavigator(
    DrawerRoutes
  )
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    nav: state.nav,
  };
}

export default connect(mapStateToProps)(AppWithNavigationState);
