import * as actionTypes from '../constants/authActionTypes';
import axios from 'axios';

export const showSignup = () => {
  return {
    type: actionTypes.SHOW_SIGN_UP
  }
}

export const hideSignup = () => {
  return {
    type: actionTypes.HIDE_SIGN_UP
  }
}

export const showLogin = () => {
  return {
    type: actionTypes.SHOW_LOG_IN
  }
}

export const hideLogin = () => {
  return {
    type: actionTypes.HIDE_LOG_IN
  }
}

export const login = (email, password) => {
  return dispatch => {
    axios.post('/login', {
      email,
      password
    })
    .then(resp => {
      dispatch(loginSuccess(resp.data));
    })
    .catch(err => console.log(err))
  }
}

export const loginSuccess = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload
  }
}

export const logout = () => {
  localStorage.removeItem('user');
  return {
    type: actionTypes.LOGOUT
  }
}