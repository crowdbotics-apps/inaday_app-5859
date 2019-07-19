import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

const features = ['Access to all record', 'Access to all lesson', 'Other exclusive cont'];
const { width } = Dimensions.get('screen');

class Subscription extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>IMAGINE A SUBSCRIPTION...</Text>
        <View style={styles.featureContainer}>
        {
          features.map(f => (
            <View
              style={styles.feature}
              key={f}
            >
              <Image
                source={require('../../assets/images/checkmark.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))
        }
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
        >
          <Text style={styles.buttonText}>SUBSCRIBE FOR $9.99/MONTH</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 6 }]}
        >
          <Text style={styles.buttonText}>SUBSCRIBE FOR $90.99/YEAR</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomContainer}>
          <View style={styles.bottomBtns}>
            <TouchableOpacity>
              <Text style={styles.bottomBtnText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.bottomBtnText}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.bottomBtnText}>Privacy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bottomText}>
            Your subscription will automatically be renewed unless turned off in Account Settings at least 24 hours before the current period ends. Payment is charged to your iTunes account.
          </Text>
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
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 3.2,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 50
  },
  featureContainer: {
    marginTop: 10
  },
  feature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  featureIcon: {
    width: 16,
    height: 16,
    tintColor: '#F0C850'
  },
  featureText: {
    marginLeft: 8,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.41,
    color: '#FFFFFF',
    opacity: 0.8
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: width - 100,
    borderRadius: 6,
    backgroundColor: '#58BED3'
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: -0.24,
    color: '#FFFFFF'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    display: 'flex',
    alignItems: 'center'
  },
  bottomBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  bottomBtnText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
    letterSpacing: -0.24
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.08,
    color: '#90949C',
    textAlign: 'center',
    marginTop: 25,
    marginHorizontal: 25
  }
})

export default Subscription;