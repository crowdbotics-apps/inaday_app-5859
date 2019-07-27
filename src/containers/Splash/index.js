import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('login');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/bg1.png')}
          style={styles.background}
        />
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    width: '100%'
  },
  logo: {
    width: '60%'
  }
})

export default Splash;