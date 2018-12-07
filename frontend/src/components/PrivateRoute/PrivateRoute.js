import React, { Component } from 'react';
import classes from './PrivateRoute.module.css';
import NavigationPane from './NavigationPane/NavigationPane';
import { Redirect, Switch, Route } from 'react-router-dom';
import Profile from '../../containers/ProfileContainer';
import Favorite from './Favorite/Favorite';
import Upload from './Upload/Upload';
import Playlist from './Playlist/Playlist';
import Password from '../../containers/PasswordContainer';

class PrivateRoute extends Component {
  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to='/' ></Redirect>
    }

    return (
      <div className={classes.container}>
        <NavigationPane></NavigationPane>
        <Switch>
          <Route exact path='/user/profile' component={Profile}></Route>
          <Route exact path='/user/password' component={Password}></Route>
          <Route exact path='/user/favorite' component={Favorite}></Route>
          <Route exact path='/user/playlist' component={Playlist}></Route>
          <Route exact path='/user/upload' component={Upload}></Route>
        </Switch>
      </div>
    )
  }
}

export default PrivateRoute;