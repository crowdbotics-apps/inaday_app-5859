import { all, spawn, call } from 'redux-saga/effects'
import { watchAuthRequests } from './auth'


export default function*() {
  let sagas = [
    watchAuthRequests
  ]

  yield all(sagas.map(saga => {
    return spawn(function* () {
      while(true) {
        try {
          yield call(saga)
          break
        } catch(e) {
          console.error(e)
        }
      }
    })
  }))
}
