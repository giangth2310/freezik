import React from 'react';
import { Component } from 'react';
import classes from './Playlist.module.css';

class Playlist extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Playlist</span>
        </div>
        <div className={classes.content}>
          
        </div>
      </div>
    )
  }
}

export default Playlist;