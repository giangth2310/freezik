import React from 'react';
import { Component } from 'react';
import classes from './Author.module.css';

class Author extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.avatar} 
          style={{
            background: `url(${this.props.avatar})`,
            backgroundSize: 'cover'
          }} >
        </div>
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