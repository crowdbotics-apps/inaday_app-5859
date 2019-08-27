import {
  UPDATE_AUTH_USER
} from '../actionTypes'

export function updateAuthUser(data) {
  return { type: UPDATE_AUTH_USER, payload: { ...data } }
}