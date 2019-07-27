import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import SettingButton from '../../components/SettingButton';
import Loader from '../../components/Loader';
import LoginButton from "../../components/LoginButton";
import firebase from "react-native-firebase";

const { height } = Dimensions.get('screen');
class Setting extends Component {
  state = {
    email: '',
    password: '',
    loaderVisible: false
  }

  onChangeText = type => value => {
    this.setState({
      [type]: value
    });
  }

  onLogOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('login');
    } catch (error) {
      alert(error.message);
    }
  }

  onUpgradeMonth = () => {

  }

  onUpgradeYear = () => {

  }

  onNavigateToAbout = () => {

  }

  onNavigateToPrivacy = () => {

  }

  onNavigateToTerms = () => {

  }

  onNavigateToMain = () => {
    this.props.navigation.navigate('main');
  }

  render() {
    const { email, password, loaderVisible } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.onNavigateToMain}
          >
            <Image
              source={require('../../assets/icons/backIcon.png')}
              style={styles.backButtonImg}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <Text
            style={styles.topText}
          >BASIC PLAN</Text>
          <Text
            style={styles.topDescription}
          >Your subscription will automatically be renewed unless turned off in Account Settings at least 24 hours before the current period ends. Payment is charged to your iTunes account.</Text>
          <SettingButton
            title="UPGRADE FOR $9.99/MONTH"
            style={{ marginTop: height * 4.5 / 100 }}
            onPress={this.onUpgradeMonth}
          />
          <SettingButton
            title="UPGRADE FOR $99.99/YEAR"
            style={{ marginTop: height * 0.01 }}
            onPress={this.onUpgradeYear}
          />
          <LoginButton
            title="LOG OUT"
            style={{ marginTop: height * 15 / 100 }}
            onPress={this.onLogOut}
          />
          <View style={styles.termContainer}>
            <View style={styles.termText}>
              <Text
                style={styles.desc}
                onPress={this.onNavigateToAbout}
              >About</Text>
            </View>
            <View style={styles.termText}>
              <Text
                style={styles.desc}
                onPress={this.onNavigateToPrivacy}
              >Terms</Text>
            </View>
            <View style={styles.termText}>
              <Text
                style={styles.desc}
                onPress={this.onNavigateToTerms}
              >Privacy</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.logoText}>INADAY@</Text>
          </View>
          <Loader
            visible={loaderVisible}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative'
  },
  background: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#373E4C',
    flex: 1,
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  backButtonImg: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    width: 20,
    height: 20
  },
  bottomContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    right: 30,
  },
  desc: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  logoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)'
  },
  topText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: '50%'
  },
  topDescription: {
    marginTop: height * 2.5 / 100,
    width: '95%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  termContainer: {
    marginTop: height * 6.5 / 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termText: {
    width: 80,
    margin: 'auto',
    alignItems: 'center'
  }
});

export default Setting;
