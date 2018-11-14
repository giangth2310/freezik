import React from 'react';
import { Component } from 'react';
import classes from './Header.module.css';
import LogoImg from '../../images/logo.png';
import Icon from '@material-ui/core/Icon';

class Header extends Component {
  render() {
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
          <div className={classes.login}>
            <span>
              Log in
            </span>
          </div>
          <div className={classes.signup}>
            <span>
              Sign up
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;