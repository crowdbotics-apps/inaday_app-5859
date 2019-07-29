import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('signup');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
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
    backgroundColor: '#373E4C',
    // position: 'absolute',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '40%'
  }
});

export default Splash;
