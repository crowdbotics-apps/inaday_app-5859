import * as types from './index';
import { deleteCookie } from '../utils/cookies'

export const loginUserAction = (user) => {
  return {
    type: types.LOGIN_USER,
    user
  }
};

export const logOutUserAction = () => {
  deleteCookie('FBUser');
  return {
    type: types.LOGOUT_USER
  }
};

