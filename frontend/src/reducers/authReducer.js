import * as actionTypes from '../constants/authActionTypes';
import DefaultAvatar from '../images/default_avatar.jpg';

let initialState = {
  isAuthenticated: false,
  showLogin: false,
  showSignup: false,
  avatar: DefaultAvatar,
  error: false
}

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  initialState = {
    ...initialState,
    isAuthenticated: true,
    ...user
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERROR_FIXING:
      return {
        ...state,
        error: false
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: true
      }
    case actionTypes.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        showLogin: false,
        showSignup: false
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        showLogin: false,
        showSignup: false,
        isAuthenticated: true,
        ...action.payload
      }
    case actionTypes.HIDE_LOG_IN:
      return {
        ...state,
        showLogin: false
      }
    case actionTypes.SHOW_LOG_IN:
      return {
        ...state,
        showLogin: true
      }
    case actionTypes.HIDE_SIGN_UP:
      return {
        ...state,
        showSignup: false
      }
    case actionTypes.SHOW_SIGN_UP:
      return {
        ...state,
        showSignup: true
      }
    default:
      return state;
  }
}

export default reducer;