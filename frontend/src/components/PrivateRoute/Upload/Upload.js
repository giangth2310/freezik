import React from 'react';
import { Component } from 'react';
import classes from './Upload.module.css';
import axios from 'axios';

class Upload extends Component {
  componentDidMount() {
    axios.get(`/musics?authorId=${this.props.auth._id}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Upload</span>
        </div>
        <div className={classes.content}>
          
        </div>
      </div>
    )
  }
}

export default Upload;