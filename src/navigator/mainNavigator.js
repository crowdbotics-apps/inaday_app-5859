import React from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation";
import { connect } from 'react-redux';

import Splash from "../containers/Splash";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Main from "../containers/Main";
import Setting from "../containers/Setting";
import About from "../containers/About";
import Policy from "../containers/Policy";
import Terms from "../containers/Terms";

const MainNavigator = React.memo(props => {
  const { auth } = props

  if(auth.uid === undefined) { // still loading
    return null
  }

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
      },
      setting: {
        screen: Setting
      },
      about: {
        screen: About
      },
      policy: {
        screen: Policy
      },
      terms: {
        screen: Terms
      }
    },
    {
      initialRouteName: auth.uid === null ? 'login' : 'main',
      defaultNavigationOptions: {
        gesturesEnabled: false
      },
      headerMode: 'none',
      lazyLoad: true
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />
})

const mapStateToProps = state => {
  const {
    auth
  } = state

  return { auth }
}

export default connect(mapStateToProps)(MainNavigator);
