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
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    });
    _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', async ({ success, url }) => {
      if (success) {
        const info = await SoundPlayer.getInfo();
        this.setState({
          duration: info.duration,
          isReady: true
        });
      }
    });

    try {
      SoundPlayer.loadUrl('https://firebasestorage.googleapis.com/v0/b/inaday.appspot.com/o/lesson.mp3?alt=media&token=48fe65c3-d1d5-490c-97ce-f1981c1edb52');
      timer = setInterval(async () => {
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
    _onFinishedPlayingSubscription.remove();
    _onFinishedLoadingFileSubscription.remove();
  }

  onPlay = () => {
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
              title="Lesson Nine"
              isPlaying={selectedIndex === 2 && isPlaying}
              isReady={selectedIndex === 2 && isReady}
              current={selectedIndex === 2 && current}
              duration={selectedIndex === 2 && duration}
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