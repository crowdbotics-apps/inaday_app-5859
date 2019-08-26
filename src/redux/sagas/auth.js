import { all, fork, spawn, call, cancelled, take } from 'redux-saga/effects'
import { eventChannel, END, delay } from 'redux-saga'
import firebase from 'react-native-firebase'

export function* watchAuthRequests() {
  yield fork(watchUser)
}

function *watchUser() {
  const channel = yield call(userChannel)

  try {
    while(true) {
      const { user } = yield take(channel)

      if(!user) {

      } else {
        const { uid } = user

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