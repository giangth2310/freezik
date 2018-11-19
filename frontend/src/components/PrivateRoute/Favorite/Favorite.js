import React from 'react';
import { Component } from 'react';
import classes from './Favorite.module.css';

class Favorite extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Favorite</span>
        </div>
        <div className={classes.content}>
          
        </div>
      </div>
    )
  }
}

export default Favorite;