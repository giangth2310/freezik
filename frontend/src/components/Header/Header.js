import React, {Fragment} from 'react';
import { Component } from 'react';
import classes from './Header.module.css';
import LogoImg from '../../images/logo.png';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { DialogActions } from '@material-ui/core';
import axios from 'axios';
import GoogleLogo from '../../images/google.svg';

class Header extends Component {
  state = {
    signupEmail: '',
    signupPassword: '',
    signupRePassword: '',
    loginEmail: '',
    loginPassword: ''
  }

  onLoginClick = () => {
    this.setState({
      loginEmail: '',
      loginPassword: ''
    })
    this.props.showLogin();
  }

  onSignupClick = () => {
    this.setState({
      signupEmail: '',
      signupPassword: '',
      signupRePassword: ''
    })
    this.props.showSignup();
  }

  onSignupEmailChange = e => {
    this.setState({
      signupEmail: e.target.value
    })
  }

  onSignupPasswordChange = e => {
    this.setState({
      signupPassword: e.target.value
    })
  }

  onSignupRePasswordChange = e => {
    this.setState({
      signupRePassword: e.target.value
    })
  }

  onSubmitSignup = () => {
    axios.post('/sign-up', {
      email: this.state.signupEmail,
      password: this.state.signupPassword
    })
      .then(resp => {
        console.log(resp.data);
      })
      .catch(err => console.log(err));
  }

  onLoginEmailChange = e => {
    this.setState({
      loginEmail: e.target.value
    })
  }

  onLoginPasswordChange = e => {
    this.setState({
      loginPassword: e.target.value
    })
  }

  onSubmitLogin = e => {
    e.preventDefault();
    this.props.login(this.state.loginEmail, this.state.loginPassword);
  }

  render() {
    const signupDialog = (
      <Dialog open={this.props.auth.showSignup} 
        onBackdropClick={this.props.hideSignup}
        PaperProps={{
          className: classes.signupDialog
        }}>
        <img src={LogoImg} alt='Freezik'></img>
        <div className={classes.signupHeader}>
          Sign up to Freezik
        </div>
        <TextField variant='outlined'
          value={this.state.signupEmail}
          id='email'
          label='Email'
          onChange={this.onSignupEmailChange}
          fullWidth></TextField>
        <TextField variant='outlined'
          value={this.state.signupPassword}
          type='password'
          id='password'
          label='Password'
          onChange={this.onSignupPasswordChange}
          fullWidth></TextField>
        <TextField variant='outlined'
          value={this.state.signupRePassword}
          type='password'
          id='rePassword'
          label='Re-enter password'
          onChange={this.onSignupRePasswordChange}
          fullWidth></TextField>
        <div>
          By clicking sign up you are agreeing to The terms of use and Privacy policy sign up
        </div>
        <DialogActions>
          <div className={classes.signupSubmit} onClick={this.onSubmitSignup}>
            <span>Sign up</span>
          </div>
        </DialogActions>
      </Dialog>
    )

    const loginDialog = (
      <Dialog open={this.props.auth.showLogin} 
        onBackdropClick={this.props.hideLogin}
        PaperProps={{
          className: classes.loginDialog
        }}>
        <img src={LogoImg} alt='Freezik'></img>
        <div className={classes.loginHeader}>
          Log in Freezik
        </div>
        <form onSubmit={this.onSubmitLogin} className={classes.loginForm}>
          <TextField variant='outlined'
            value={this.state.loginEmail}
            id='email'
            label='Email'
            onChange={this.onLoginEmailChange}
            fullWidth></TextField>
          <TextField variant='outlined'
            value={this.state.loginPassword}
            type='password'
            id='password'
            label='Password'
            onChange={this.onLoginPasswordChange}
            fullWidth></TextField>
          <button style={{display: 'none'}}
            ref={loginSubmitButton => this.loginSubmitButton = loginSubmitButton}></button>
        </form>
        <div className={classes.forgotPassword}>
          <span>
            Forgot password?
          </span>
        </div>
        <div className={classes.loginSubmit} onClick={() => this.loginSubmitButton.click()}>
          <span>Log in</span>
        </div>
        <div className={classes.connectWith}>
          <span>
            Or connect with:
          </span>
        </div>
        <div className={classes.thirdParty}>
          <div className={classes.facebook}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" className={classes.facebookLogo} color="#FFFFFF"><path fill="#FFFFFF" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
            <span>Facebook</span>
          </div>
          <div className={classes.google}>
            <img src={GoogleLogo} alt='Google' className={classes.googleLogo}></img>
            <span>Google</span>
          </div>
        </div>
      </Dialog>
    )

    const accountMenu = (
      <div>
        nani
      </div>
    )

    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <img src={LogoImg} alt='Freezik' className={classes.logo}></img>
          <div className={classes.searchBar}>
            <input placeholder='Search all music'></input>
            <Icon>
              search
            </Icon>
          </div>
        </div>
        <div className={classes.right}>
          {this.props.auth.isAuthenticated ? accountMenu : (
          <Fragment>
            <div className={classes.login} onClick={this.onLoginClick}>
              <span>
                Log in
              </span>
            </div>
            <div className={classes.signup} onClick={this.onSignupClick}>
              <span>
                Sign up
              </span>
            </div>
          </Fragment>
          )}
        </div>
        {signupDialog}
        {loginDialog}
      </div>
    )
  }
}

export default Header;