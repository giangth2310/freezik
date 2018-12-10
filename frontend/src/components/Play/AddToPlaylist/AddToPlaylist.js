import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import classes from './AddToPlaylist.module.css';

class AddToPlaylist extends Component {
  state = {
    playlist: []
  }

  componentDidMount() {
    axios.get(`/playlists?authorId=${this.props.userId}`)
    .then(response => {
      this.setState({
        playlist: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.playlist.map((el, index) => {
          return (
            <div key={index}>
              <span>{index + 1}</span>
              <span>{el.name}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default AddToPlaylist;