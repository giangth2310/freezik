import React from 'react';
import { Component } from 'react';
import classes from './Password.module.css';
import { TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

class Password extends Component {
  state = {
    curPassword: '',
    newPassword: '',
    reNewPassword: '',
    errorMessage: '',
    showSuccessMessage: false
  }

  onSubmit = e => {
    e.preventDefault();
    const { newPassword, reNewPassword, curPassword } = this.state;
    if (newPassword !== reNewPassword) {
      this.setState({
        errorMessage: 'Confirm new password did not match',
      })
      return;
    }

    axios.put('/password', {
      _id: this.props.auth._id,
      curPassword, newPassword
    })
    .then(resp => {
      this.setState({
        showSuccessMessage: true
      })
    })
    .catch(err => console.log(err))
  }

  onCurPasswordChange = e => {
    this.setState({
      curPassword: e.target.value,
      errorMessage: null,
      showSuccessMessage: false
  })
  }

  onNewPasswordChange = e => {
    this.setState({
      newPassword: e.target.value,
      errorMessage: null,
      showSuccessMessage: false
    })
  }

  onReNewPasswordChange = e => {
    this.setState({
      reNewPassword: e.target.value,
      errorMessage: null,
      showSuccessMessage: false
    })
  }

  render() {
    const errorMessage = this.state.errorMessage ? (
      <div className={`${classes.marginBot} ${classes.error}`}>
        <Icon>
          error_outline
        </Icon>
        <span>{this.state.errorMessage}</span>
      </div>
    ) : null; 
    
    const successMessage = this.state.showSuccessMessage ? (
      <div className={`${classes.marginBot} ${classes.success}`}>
        <Icon>
          check_circle
        </Icon>
        <span>Your password has been changed successfully!</span>
      </div>
    ) : null;
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Password</span>
        </div>
        <div className={classes.content}>
          <form className={classes.form} onSubmit={this.onSubmit}>
            {errorMessage}
            {successMessage}
            <TextField
              className={classes.marginBot}
              fullWidth
              variant='outlined'
              value={this.state.curPassword}
              onChange={this.onCurPasswordChange}
              label='Current Password'
              type='password'
            ></TextField>
            <TextField
              fullWidth
              className={classes.marginBot}
              value={this.state.newPassword}
              onChange={this.onNewPasswordChange}
              variant='outlined'
              label='New password'
              type='password'
            ></TextField>
            <TextField
              fullWidth
              variant='outlined'
              className={classes.marginBot}
              onChange={this.onReNewPasswordChange}
              value={this.state.reNewPassword}
              label='Confirm new password'
              type='password'
            ></TextField>
            <div className={classes.buttonContainer}>
              <button className={classes.button} type='submit'>
                Update password
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Password;