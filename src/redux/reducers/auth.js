import {
  UPDATE_AUTH_USER,
} from '../actionTypes'

const initialState = {
  uid: undefined,
}

export function auth(state=initialState, action) {
  const { type, payload } = action

  switch(type) {
    case UPDATE_AUTH_USER: {
      return { ...state, uid: payload.uid }
    }
  }

  return state
}