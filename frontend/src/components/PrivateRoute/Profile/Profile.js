import React from 'react';
import { Component } from 'react';
import classes from './Profile.module.css';
import TextField from '@material-ui/core/TextField';

class Profile extends Component {
  state = {
    email: '',
    name: '',
    avatar: null
  }

  componentDidMount() {
    this.setState({
      email: this.props.auth.email,
      name: this.props.auth.name
    })
  }

  onEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  onNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }
 
  onSave = e => {
    e.preventDefault();
    this.props.saveProfile(this.state.email, this.state.name, this.state.avatar);
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Profile</span>
        </div>
        <div className={classes.content}>
          <form className={classes.form} onSubmit={this.onSave}>
            <TextField
              label='Email'
              value={this.state.email}
              variant='outlined'
              onChange={this.onEmailChange}
              fullWidth
            ></TextField>
            <TextField
              label='Display name'
              value={this.state.name}
              variant='outlined'
              onChange={this.onNameChange}
              fullWidth
            ></TextField>
            <div className={classes.buttonContainer}>
              <button type='submit' className={classes.button}>
                Save
              </button>
            </div>
          </form>
          <div className={classes.avatarForm}>
            <div className={classes.avatar} style={{
              background: `url(${this.props.auth.avatar}) no-repeat 50% 50%`,
              backgroundSize: 'cover'
            }} ></div>
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={e => this.setState({avatar: e.target.files[0]})}
              ref={node => this.avatarInput = node}></input>
            <div className={classes.avatarUpload} onClick={() => this.avatarInput.click()} >
              <span>Upload new picture</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;