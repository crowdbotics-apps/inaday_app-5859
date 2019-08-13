import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Loader from '../../components/Loader';
import LoginButton from '../../components/LoginButton';
import { Logout } from '../../api/auth';

const { height } = Dimensions.get('screen');
class Setting extends Component {
  state = {
    loaderVisible: false,
  };

  onChangeText = type => value => {
    this.setState({
      [type]: value,
    });
  };

  onLogOut = async () => {
    try {
      await Logout();
      this.props.navigation.navigate('login');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  onUpgradeMonth = () => {};

  onUpgradeYear = () => {};

  onNavigateToAbout = () => {
    this.props.navigation.navigate('about');
  };

  onNavigateToPrivacy = () => {
    this.props.navigation.navigate('policy');
  };

  onNavigateToTerms = () => {
    this.props.navigation.navigate('terms');
  };

  onNavigateToMain = () => {
    this.props.navigation.navigate('main');
  };

  render() {
    const { loaderVisible } = this.state;
    const { goBack } = this.props.navigation;
    const terms =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem nulla, lacinia ut nisl sed, mollis dignissim risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin sollicitudin leo in semper hendrerit. Pellentesque congue metus ex, et posuere lacus iaculis at. Integer molestie sodales cursus. Sed lacinia blandit odio, eu vehicula metus posuere at. Morbi vel arcu purus. Pellentesque massa quam, tristique placerat molestie at, efficitur ut sapien. Phasellus augue risus, aliquam et nibh vitae, mattis consectetur massa. Proin hendrerit commodo nisl quis sagittis.\n\n' +
      'Vivamus feugiat est eu fermentum mattis. Vestibulum mattis mollis justo ut pharetra. Morbi tincidunt interdum urna, ac pretium quam vulputate non. Duis ante ligula, sodales non mollis non, semper ut mauris. Donec nec nisl aliquet ipsum scelerisque tristique ac non nunc. Curabitur varius auctor sem, quis venenatis augue gravida ut. Nullam tempus tortor eget mauris efficitur finibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis quam vitae elit consequat aliquam. In nec quam eget ante sollicitudin blandit. Fusce vitae purus ut sapien viverra mollis eu vitae turpis.';

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          {/*<TouchableOpacity*/}
          {/*  style={styles.backButton}*/}
          {/*  onPress={this.onNavigateToMain}*/}
          {/*>*/}
          {/*  <Image*/}
          {/*    source={require('../../assets/icons/backIcon.png')}*/}
          {/*    style={styles.backButtonImg}*/}
          {/*    resizeMode='contain'*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
          {/*<Text*/}
          {/*  style={styles.topText}*/}
          {/*>BASIC PLAN</Text>*/}
          {/*<Text*/}
          {/*  style={styles.topDescription}*/}
          {/*>Your subscription will automatically be renewed unless turned off in Account Settings at least 24 hours before the current period ends. Payment is charged to your iTunes account.</Text>*/}
          {/*<SettingButton*/}
          {/*  title="UPGRADE FOR $9.99/MONTH"*/}
          {/*  style={{ marginTop: height * 4.5 / 100 }}*/}
          {/*  onPress={this.onUpgradeMonth}*/}
          {/*/>*/}
          {/*<SettingButton*/}
          {/*  title="UPGRADE FOR $99.99/YEAR"*/}
          {/*  style={{ marginTop: height * 0.01 }}*/}
          {/*  onPress={this.onUpgradeYear}*/}
          {/*/>*/}
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Image
              source={require('../../assets/icons/backIcon.png')}
              style={styles.backButtonImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.topText}>ABOUT</Text>
          <Text style={styles.topDescription}>{terms}</Text>
          <LoginButton
            title="LOG OUT"
            style={{ marginTop: (height * 5) / 100 }}
            onPress={this.onLogOut}
          />
          <View style={styles.termContainer}>
            <TouchableOpacity onPress={this.onNavigateToTerms}>
              <Text style={styles.desc}>Terms</Text>
            </TouchableOpacity>
          </View>
          <LoginButton
            title="LOG OUT"
            style={{ marginTop: (height * 15) / 100 }}
            onPress={this.onLogOut}
          />
          <View style={styles.termContainer}>
            <View style={styles.termText}>
              <TouchableOpacity onPress={this.onNavigateToAbout}>
                <Text style={styles.desc}>About</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.termText}>
              <TouchableOpacity onPress={this.onNavigateToTerms}>
                <Text style={styles.desc}>Terms</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.logoText}>© 2019 Inaday</Text>
          </View>
          <Loader visible={loaderVisible} />
        </View>
      </View>
    );
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
    position: 'relative',
  },
  background: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#373E4C',
    flex: 1,
    justifyContent: 'center',
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
    height: 20,
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
    color: 'rgba(255, 255, 255, 0.6)',
  },
  topText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: '70%',
  },
  topDescription: {
    marginTop: (height * 2.5) / 100,
    width: '95%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  termContainer: {
    marginTop: (height * 6.5) / 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termText: {
    width: 80,
    margin: 'auto',
    alignItems: 'center',
  },
});

export default Setting;
