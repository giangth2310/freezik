import React, { Component } from 'react';
import classes from './MusicListItem.module.css';

class MusicListItem extends Component {
  render() {
    return (
      <div className={classes.container}>
        <span className={classes.index}>{this.props.index + 1}</span>
      </div>
    )
  }
}

export default MusicListItem;