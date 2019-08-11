import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import SoundPlayer from 'react-native-sound-player';
import firebase from 'react-native-firebase';
import DayComponent from '../../components/DayComponent';
import Subscription from '../../components/Subscription';
import AsyncStorage from "@react-native-community/async-storage";

let date = new Date();
const initialState = {
  current: 0,
  duration: 0,
  isReady: false,
  isPlaying: false,
  isRequiredSubscription: false,
  file: {},
  playLogs: [],
  selectedIndex: 0,
  uid: null,
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  _onFinishedPlayingSubscription = null;
  _onFinishedLoadingURLSubscription = null;
  timer = null;

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      const uid = await AsyncStorage.getItem('@InadayStore');
      this.setState({
        uid
      });
      console.log('uid', uid);
      await this.getUserByUid(this.state.uid);

      if (this.state.playLogs && this.state.playLogs.length > 0) {
        const timeDiff = this.getDayDiff(this.state.playLogs[this.state.playLogs.length -1].trackAt);
        if (timeDiff > 1) {
          await this.setNextPlayList();
        } else {
          await this.onTodayPlay();
        }
      } else {
        await this.setInitPlayList();
      }

      try {
        if (this.state.file.url) {
          this._onFinishedPlayingSubscription = await SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished playing', success)
          });
          this._onFinishedLoadingURLSubscription = await SoundPlayer.addEventListener('FinishedLoadingURL', async ({ success, url }) => {
            if (success) {
              const info = await SoundPlayer.getInfo();
              this.setState({
                duration: info.duration,
                isReady: true
              });
            }
          });

          SoundPlayer.loadUrl(this.state.file.url);
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
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });
  }

  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove();
    this._onFinishedLoadingURLSubscription.remove();
  }

  getDayDiff = (val) => (date.getTime() - val) / (1000 * 3600 * 24);

  getUserByUid = uid =>
    new Promise((resolve) => {
      const user = firebase.firestore().collection('users').doc(uid);
      user.onSnapshot(async snapshot => {

        let userData = {
          id: snapshot.data().id,
          createdAt: snapshot.data().createdAt,
          playLogs: snapshot.data().playLogs,
          status: snapshot.data().status,
        };
        this.setState({
          isRequiredSubscription: this.getDayDiff(userData.createdAt) > 7,
          playLogs: userData.playLogs,
          selectedIndex: this.getDayDiff(userData.createdAt) > 7 ? 1 : 2,
        });
        // console.log(this.getDayDiff(userData.createdAt))
        resolve(userData);
      });
    });

  onTodayPlay = () =>
    new Promise((resolve) => {
      const fileId = this.state.playLogs[this.state.playLogs.length - 1].fileId;
      const file = firebase.firestore().collection('files').doc(fileId);
      file.onSnapshot(async snapshot => {
        let fileData = {
          id: snapshot.data().id,
          name: snapshot.data().name,
          url: snapshot.data().url,
        };

        this.setState({
          file: fileData,
        });

        resolve(true);
      });
    });

  setInitPlayList = async () =>
    new Promise((resolve) => {
      // get first file's info order by `order number`
      let firstPlayerRef = firebase.firestore()
        .collection('files')
        .orderBy('order', 'asc')
        .limit(1);
      firstPlayerRef.get().then(async (snapshot) => {
        let file = await snapshot.docs[0].data();
        this.setState({
          file
        });
        const user = await firebase.firestore().collection('users').doc(this.state.uid);
        user.set({
          playLogs: [
            {
              fileId: file.id,
              trackAt: date.getTime(),
            }
          ]
        }, {
          merge: true,
        });
      });

      resolve(true);
    });

  setNextPlayList = () =>
    new Promise((resolve) => {
      // get first file's info order by `order number`
      const dt = new Date( "August 06, 2019 00:15:20" );
      console.log('next: ', dt.getTime());
      let playerRef = firebase.firestore().collection('files')
        .where('order', '>', this.state.playLogs.length - 1)
        .orderBy('order', 'asc');

      playerRef.get().then(async (snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i ++) {
          let file = await snapshot.docs[i].data();
          if (file.active === 1) {
            this.setState({
              file,
            });

            let playLogs = this.state.playLogs;

            playLogs.push({
              fileId: file.id,
              trackAt: date.getTime(),
            });
            await firebase.firestore().collection('users').doc(this.state.uid).set({playLogs}, {merge: true});

            resolve(true);
            break;
          }
        }

      });
    });

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

  onNavigateToSetting = () => {
    this.props.navigation.navigate('setting');
  }


  render() {
    const { selectedIndex, isPlaying, isReady, current, duration } = this.state;
    return (
      <View style={styles.container}>
        {this.state.isRequiredSubscription ? (<Swiper
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
        </Swiper>) : (<Swiper
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
            <View style={styles.dayContainer}>
              {this.state.file.url && <DayComponent
                day="TODAY"
                title={this.state.file.name}
                isPlaying={isPlaying}
                isReady={isReady}
                current={current}
                duration={duration}
                onPlay={this.onPlay}
              />}
            </View>
          </Swiper>)}
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
  dayContainer: {
    flex: 1,
    backgroundColor: '#758ec8'
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
