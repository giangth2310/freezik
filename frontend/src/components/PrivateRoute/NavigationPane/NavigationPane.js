import React, { Component } from 'react';
import classes from './NavigationPane.module.css';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import { NavLink } from 'react-router-dom';

class NavigationPane extends Component {
  render() {
    return (
      <div className={classes.container}>
        <MenuItem component={NavLink} to='/user/profile' activeClassName={classes.active} className={classes.navLink}>
          <Icon>
            person
          </Icon>
          <span>Profile</span>
        </MenuItem>
        <MenuItem component={NavLink} to='/user/password' activeClassName={classes.active} className={classes.navLink}>
          <Icon>
            vpn_key
          </Icon>
          <span>Password</span>
        </MenuItem>
        <MenuItem component={NavLink} to='/user/favorite' activeClassName={classes.active} className={classes.navLink}>
          <Icon>
            favorite
          </Icon>
          <span>Favorite</span>
        </MenuItem>
        <MenuItem component={NavLink} to='/user/playlist' activeClassName={classes.active} className={classes.navLink}>
          <Icon>
            queue_music
          </Icon>
          <span>Playlist</span>
        </MenuItem>
        <MenuItem component={NavLink} to='/user/upload' activeClassName={classes.active} className={classes.navLink}>
          <Icon>
            cloud_upload
          </Icon>
          <span>Upload</span>
        </MenuItem>
      </div>
    )
  }
}

export default NavigationPane;