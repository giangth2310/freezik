import React from 'react';
import { Component } from 'react';
import classes from './Author.module.css';

class Author extends Component {
  render() {
    return (
      <div className={classes.container} onClick={this.props.onClick}>
        <img alt='avatar' src={this.props.avatar} className={classes.avatar}></img>
        <div className={classes.authorName}>
          <span>
            {this.props.name}
          </span>
        </div>
      </div>
    )
  }
}

export default Author;