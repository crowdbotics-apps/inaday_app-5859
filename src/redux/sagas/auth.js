import { all, fork, spawn, call, cancelled, take, put } from 'redux-saga/effects'
import { eventChannel, END, delay } from 'redux-saga'
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'
import { updateAuthUser } from '../actions/auth'

let splashScreenShowing = true

export function* watchAuthRequests() {
  yield fork(watchUser)
}

function *watchUser() {
  const channel = yield call(userChannel)

  try {
    while(true) {
      const { user } = yield take(channel)

      if(!user) {
        yield put(updateAuthUser({ uid: null }))
      } else {
        const { uid } = user

        yield put(updateAuthUser({ uid }))
      }

      if(splashScreenShowing === true) {
        splashScreenShowing = false
        SplashScreen.hide()
      }
    }
  } catch(e) {
    console.error(e)
  } finally {
    if(yield cancelled()) {
      channel.close()
    }
  }
}

function userChannel() {
  return eventChannel(emit => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      emit({user})
    })

    return unsubscribe
  })
}