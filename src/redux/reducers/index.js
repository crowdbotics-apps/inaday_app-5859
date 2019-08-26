import { combineReducers } from "redux";
/**
 * You can import more reducers here
 */

export default combineReducers({
  blank: (state, action) => {
    if (state == null) state = [];
    return state;
  }
});
