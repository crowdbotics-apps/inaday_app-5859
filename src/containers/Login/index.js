import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import LoginInput from '../../components/LoginInput';
import LoginButton from '../../components/LoginButton';
import FBButton from '../../components/FBButton';
import Loader from '../../components/Loader';
import { signIn, signInWithFacebook } from '../../api/auth';

const { height } = Dimensions.get('screen');
class Login extends Component {
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

  onSignIn = async () => {
    this.setState({
      loaderVisible: true
    });
    const { email, password } = this.state;
    if (!email.length || !password.length) {
      alert('All fields are required');
      return;
    } else {
      try {
        await signIn(email, password);
        this.props.navigation.navigate('main');
      } catch (error) {
        alert(error.message);
      }
    }
    this.setState({
      loaderVisible: false
    });
  }

  onSignInFacebook = async () => {
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

  onNavigateToSignUp = () => {
    this.props.navigation.navigate('signup');
  }

  render() {
    const { email, password, loaderVisible } = this.state;
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
          value={email}
          onChangeText={this.onChangeText('email')}
          placeholder="Email"
          style={{ marginTop: height * 7.7 / 100 }}
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
        <LoginButton
          title="SIGN IN"
          style={{ marginTop: height * 0.02 }}
          onPress={this.onSignIn}
        />
        <FBButton
          title="SIGN IN WITH FACEBOOK"
          style={{ marginTop: height * 7 / 100 }}
          onPress={this.onSignInFacebook}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.desc}>Don't have an account yet?</Text>
          <TouchableOpacity
            style={{ marginLeft: 2 }}
            onPress={this.onNavigateToSignUp}
          >
            <Text style={[styles.desc, { fontWeight: 'bold' }]}>Sign up now</Text>
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

export default Login;