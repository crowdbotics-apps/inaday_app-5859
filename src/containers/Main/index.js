import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

class Main extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/bg2.png')}
          style={styles.background}
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
  }
})

export default Main;