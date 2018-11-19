import React from 'react';
import { Component } from 'react';
import classes from './Profile.module.css';

class Profile extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Profile</span>
        </div>
        <div className={classes.content}>
          
        </div>
      </div>
    )
  }
}

export default Profile;