import { all, fork, spawn, call, cancelled, take, put, delay } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import firebase from 'react-native-firebase'
import { updateAuthUser } from '../actions/auth'

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