import * as types from '../actions';

const initialState = {
  success: false
};

export default function(state = initialState, action) {
  const response = action.response;

  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        response,
        success: true
      };
    case types.LOGOUT_USER:{
      return {
        ...state,
        response,
        success: false
      };
    }

    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        response,
        success: false
      };
    default:
      return state;
  }
};
