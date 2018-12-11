import React from 'react';
import { Component } from 'react';
import classes from './Header.module.css';
import LogoImg from '../../images/logo.png';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { DialogActions, Avatar, MenuItem, Paper, Divider } from '@material-ui/core';
import axios from 'axios';
import GoogleLogo from '../../images/google.svg';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  state = {
    signupEmail: '',
    signupPassword: '',
    signupRePassword: '',
    loginEmail: '',
    loginPassword: '',
    showAccountMenu: false,
    searchVal: ''
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

  onSubmitSignup = e => {
    e.preventDefault();
    axios.post('/sign-up', {
      email: this.state.signupEmail,
      password: this.state.signupPassword
    })
      .then(resp => {
        this.props.loginSuccess(resp.data);
      })
      .catch(err => console.log(err));
  }

  onLoginEmailChange = e => {
    if (this.props.auth.error) {
      this.props.errorFixing();
    }
    this.setState({
      loginEmail: e.target.value
    })
  }

  onLoginPasswordChange = e => {
    if (this.props.auth.error) {
      this.props.errorFixing();
    }
    this.setState({
      loginPassword: e.target.value
    })
  }

  onSubmitLogin = e => {
    e.preventDefault();
    this.props.login(this.state.loginEmail, this.state.loginPassword);
  }

  onMockupLogin = () => {
    this.props.login('tientien@gmail.com', 'tientien');
  }

  toggleAccountMenu = () => {
    this.setState((prevState) => {
      return {
        showAccountMenu: !prevState.showAccountMenu
      }
    })
  }

  closeAccountMenu = () => {
    this.setState({
      showAccountMenu: false
    })
  }

  logout = () => {
    this.closeAccountMenu();
    this.props.logout();
  }

  onSearchChange = e => {
    this.setState({
      searchVal: e.target.value
    })
  }

  onSearch = () => {
    if (!this.state.searchVal) {
      return
    }
    this.setState({
      searchVal: ''
    })
    this.props.history.push(`/search?q=${this.state.searchVal}`);
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
        <form onSubmit={this.onSubmitSignup} className={classes.signupForm}>
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
          <button style={{display: 'none'}}
            ref={signupSubmitButton => this.signupSubmitButton = signupSubmitButton}></button>
        </form>
        <div style={{padding: '0 5px'}}>
          By clicking sign up you are agreeing to The terms of use and Privacy policy sign up
        </div>
        <DialogActions>
          <div className={classes.signupSubmit} onClick={() => this.signupSubmitButton.click()}>
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
        {this.props.auth.error ? (
          <div className={classes.errMessage}>
            Invalid email or password
          </div>
        ) : null}
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
          <div className={classes.facebook} onClick={this.onMockupLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" className={classes.facebookLogo} color="#FFFFFF"><path fill="#FFFFFF" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
            <span>Facebook</span>
          </div>
          <div className={classes.google} onClick={this.onMockupLogin}>
            <img src={GoogleLogo} alt='Google' className={classes.googleLogo}></img>
            <span>Google</span>
          </div>
        </div>
      </Dialog>
    )

    const account = (
      <ClickAwayListener onClickAway={this.closeAccountMenu}>
        <div className={classes.account}>
          <Avatar src={this.props.auth.avatar}></Avatar>
          <span >{this.props.auth.name}</span>
          <Icon onClick={this.toggleAccountMenu}>
            keyboard_arrow_down
          </Icon>
          <Paper className={`${classes.accountMenu} ${this.state.showAccountMenu ? '' : classes.hide}`}>
            <MenuItem component={Link} to='/user/profile' onClick={this.closeAccountMenu} className={classes.navLink}>
              <Icon>
                person
              </Icon>
              <span>Profile</span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem component={Link} to='/user/password' onClick={this.closeAccountMenu} className={classes.navLink}>
              <Icon>
                vpn_key
              </Icon>
              <span>Password</span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem component={Link} to='/user/favorite' onClick={this.closeAccountMenu} className={classes.navLink}>
              <Icon>
                favorite
              </Icon>
              <span>Favorite</span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem component={Link} to='/user/playlist' onClick={this.closeAccountMenu} className={classes.navLink}>
              <Icon>
                queue_music
              </Icon>
              <span>Playlist</span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem component={Link} to='/user/upload' onClick={this.closeAccountMenu} className={classes.navLink}>
              <Icon>
                cloud_upload
              </Icon>
              <span>Upload</span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem component={Link} to='/' onClick={this.logout} className={classes.navLink}>
              <Icon>
                exit_to_app
              </Icon>
              <span>Log out</span>
            </MenuItem>
          </Paper>
        </div>
      </ClickAwayListener>
    )

    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <Link to='/'>
            <img src={LogoImg} alt='Freezik' className={classes.logo}></img>
          </Link>
          <div className={classes.searchBar}>
            <input placeholder='Search all music' 
              value={this.state.searchVal}
              onChange={this.onSearchChange}></input>
            <Icon style={{
              cursor: 'pointer'
            }} onClick={this.onSearch}>
              search
            </Icon>
          </div>
        </div>
        {this.props.auth.isAuthenticated ? account : (
        <div className={classes.right}>
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
          </div>
        )}
        {signupDialog}
        {loginDialog}
      </div>
    )
  }
}

export default withRouter(Header);