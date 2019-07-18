import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import LoginInput from '../../components/LoginInput';
import LoginButton from '../../components/LoginButton';
import FBButton from '../../components/FBButton';
import { signUp, signInWithFacebook } from '../../api/auth';
import Loader from '../../components/Loader';

const { height } = Dimensions.get('screen');
class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    cPassword: '',
    loaderVisible: false
  }

  onChangeText = type => value => {
    this.setState({
      [type]: value
    });
  }

  onSignUp = async () => {
    this.setState({
      loaderVisible: true
    });
    const { name, email, password, cPassword } = this.state;
    if (!name.length || !email.length || !password.length || !cPassword.length) {
      alert('All fields are required');
      return;
    } else if (password !== cPassword) {
      alert('Password mismatch');
    } else {
      try {
        await signUp(name, email, password);
        this.props.navigation.navigate('main');
      } catch (error) {
        alert(error.message);
      }
    }
    this.setState({
      loaderVisible: false
    });
  }

  onSignUpFacebook = async () => {
    this.setState({
      loaderVisible: true
    });
    try {
      await signInWithFacebook();
      this.props.navigation.navigate('main');
    } catch (error) {
      alert(error.message);
    }
    this.setState({
      loaderVisible: false
    });
  }

  onNavigateToSignIn = () => {
    this.props.navigation.navigate('login');
  }

  render() {
    const { name, email, password, cPassword, loaderVisible } = this.state;
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
        <LoginInput
          value={name}
          onChangeText={this.onChangeText('name')}
          placeholder="Name"
          style={{ marginTop: height * 7.7 / 100 }}
          />
        <LoginInput
          value={email}
          onChangeText={this.onChangeText('email')}
          placeholder="Email"
          style={{ marginTop: height * 0.02 }}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <LoginInput
          value={password}
          onChangeText={this.onChangeText('password')}
          placeholder="Password"
          style={{ marginTop: height * 0.02 }}
          secureTextEntry
        />
        <LoginInput
          value={cPassword}
          onChangeText={this.onChangeText('cPassword')}
          placeholder="Confirm Password"
          style={{ marginTop: height * 0.02 }}
          secureTextEntry
        />
        <LoginButton
          title="SIGN UP"
          style={{ marginTop: height * 0.02 }}
          onPress={this.onSignUp}
        />
        <FBButton
          title="SIGN UP WITH FACEBOOK"
          style={{ marginTop: height * 7 / 100 }}
          onPress={this.onSignUpFacebook}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.desc}>Have an account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 2 }}
            onPress={this.onNavigateToSignIn}
          >
            <Text style={[styles.desc, { fontWeight: 'bold' }]}>Sign in now</Text>
          </TouchableOpacity>
        </View>
        <Loader
          visible={loaderVisible}
        />
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
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  logo: {
    height: '16%',
    marginTop: '15%'
  },
  bottomContainer: {
    marginTop: 48.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  desc: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.5
  }
})

export default Signup;