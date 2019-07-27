import { createStackNavigator, createAppContainer } from "react-navigation";

import Splash from "../containers/Splash";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Main from "../containers/Main";
/**
 * new navigators can be imported here
 */

const AppNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash
    },
    login: {
      screen: Login
    },
    signup: {
      screen: Signup
    },
    main: {
      screen: Main
    }
  },
  {
    initialRouteName: "splash",
    defaultNavigationOptions: {
			gesturesEnabled: false
		},
		headerMode: 'none',
		lazyLoad: true
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
