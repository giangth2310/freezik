import axios from 'axios';

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
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
  }
}