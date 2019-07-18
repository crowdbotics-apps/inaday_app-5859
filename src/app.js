import React from "react";
import { mapping, light } from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "react-native-ui-kitten";
import { Provider as ReduxProvider } from "react-redux";

import { styles } from "./app.styles";
import { store } from "./redux/store";
import MainNavigator from "./navigator/mainNavigator";

export default class App extends React.Component {
  state = {
    isLoaded: false
  };

  componentWillMount() {
    this.loadAssets();
  }

  loadAssets = async () => {
    // add any loading assets here
    this.setState({ isLoaded: true });
  };

  renderLoading = () => (
    <Layout style={[styles.flex]}>
      <Text>Loading</Text>
    </Layout>
  );

  renderApp = () => (
    <ReduxProvider store={store}>
      <ApplicationProvider mapping={mapping} theme={light}>
        <MainNavigator/>
      </ApplicationProvider>
    </ReduxProvider>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}
