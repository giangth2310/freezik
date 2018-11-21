import axios from 'axios';
import * as actionTypes from '../constants/authActionTypes';

export const saveProfile = (email, name, avatar) => {
  return dispatch => {
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem('user'));
    if (avatar) {
      formData.append('avatar', avatar, avatar.name);
    }
    formData.append('email', email);
    formData.append('name', name);
    formData.append('_id', user._id);
    axios.put('/profile', formData)
    .then(resp => {
      console.log(resp.data)
      dispatch(saveProfileSuccess(resp.data));
    })
    .catch(err => console.log(err))
  }
}

export const saveProfileSuccess = (newProfile) => {
  let user = JSON.parse(localStorage.getItem('user'));
  user = {
    ...user,
    ...newProfile
  }
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: actionTypes.SAVE_PROFILE_SUCCESS,
    payload: newProfile
  }
}