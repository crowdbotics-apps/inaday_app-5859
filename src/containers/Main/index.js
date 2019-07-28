import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import DayComponent from '../../components/DayComponent';
import Subscription from '../../components/Subscription';
import SoundPlayer from 'react-native-sound-player';

class Main extends Component {
  state = {
    selectedIndex: 2,
    duration: 0,
    current: 0,
    isReady: false,
    isPlaying: false
  };

  _onFinishedPlayingSubscription = null;
  _onFinishedLoadingURLSubscription = null;
  timer = null;

  componentDidMount() {
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    });
    this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', async ({ success, url }) => {
      if (success) {
        const info = await SoundPlayer.getInfo();
        this.setState({
          duration: info.duration,
          isReady: true
        });
      }
    });

    try {
      SoundPlayer.loadUrl('https://firebasestorage.googleapis.com/v0/b/inaday.appspot.com/o/1564064079545-Shoe%20Dog%20Book%20Summary.mp3?alt=media&token=a72f2b40-6bea-46bb-a499-2be315323947');
      this.timer = setInterval(async () => {
        if (this.state.isPlaying) {
          if (this.state.current >= this.state.duration) {
            clearInterval(this.timer);
            SoundPlayer.seek(0);
            this.setState({
              isPlaying: false
            });
          } else {
            const info = await SoundPlayer.getInfo();
            this.setState({
              current: info.currentTime
            });
          }
        }
      }, 100)
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove();
    this._onFinishedLoadingURLSubscription.remove();
  }

  onPlay = () => {
    console.log('play!');
    if (this.state.current > this.state.duration) {
      this.setState({
        current: 0
      });
    }
    const { isPlaying } = this.state;
    if (isPlaying) {
      SoundPlayer.pause();
    } else {
      SoundPlayer.play();
    }
    this.setState({
      isPlaying: !isPlaying
    });
  }

  onIndexChanged = index => {
    this.setState({
      selectedIndex: index
    })
  }

  onNavigateToSetting = () => {
    this.props.navigation.navigate('setting');
  }

  render() {
    const { selectedIndex, isPlaying, isReady, current, duration } = this.state;
    return (
      <View style={styles.container}>
        <Swiper
          loop={false}
          autoplay={false}
          showsButtons={false}
          paginationStyle={{ marginBottom: 30 }}
          dot={<View style={styles.dot}/>}
          activeDot={<View style={styles.activeDot}/>}
          index={selectedIndex}
          onIndexChanged={this.onIndexChanged}
        >
          <View style={{ flex: 1 }}>
            <Subscription/>
          </View>
          {/* <View style={{ flex: 1 }}>
            <DayComponent
              day="YESTERDAY"
              title="Lesson Eight"
              isPlaying={selectedIndex === 1 && isPlaying}
              isReady={selectedIndex === 1 && isReady}
              current={selectedIndex === 1 && current}
              duration={selectedIndex === 1 && duration}
              onPlay={selectedIndex === 1 ? this.onPlay : () => {}}
            />
          </View> */}
          <View style={{ flex: 1 }}>
            <DayComponent
              day="TODAY"
              title="Shoe Dog Book Summary"
              isPlaying={isPlaying}
              isReady={isReady}
              current={current}
              duration={duration}
              onPlay={selectedIndex === 2 ? this.onPlay : () => {}}
            />
          </View>
          {/* <View style={{ flex: 1 }}>
            <DayComponent
              day="TOMORROW"
              title="Lesson Ten"
              isPlaying={selectedIndex === 3 && isPlaying}
              isReady={selectedIndex === 3 && isReady}
              current={selectedIndex === 3 && current}
              duration={selectedIndex === 3 && duration}
              onPlay={selectedIndex === 3 ? this.onPlay : () => {}}
            />
          </View> */}
        </Swiper>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={this.onNavigateToSetting}
        >
          <Image
            source={require('../../assets/images/settings.png')}
            style={styles.settingsBtnImg}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsBtn: {
    position: 'absolute',
    top: 40,
    right: 40
  },
  settingsBtnImg: {
    width: 20,
    height: 20
  },
  dot: {
    width: 32,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 3
  },
  activeDot: {
    width: 32,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 3
  }
})

export default Main;
