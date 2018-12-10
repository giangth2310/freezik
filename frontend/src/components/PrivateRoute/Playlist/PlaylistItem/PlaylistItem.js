import React, { Component } from 'react';
import classes from './PlaylistItem.module.css';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@material-ui/core';

class PlaylistItem extends Component {
  state = {
    hover: false,
    editing: false
  }

  componentDidMount() {
    axios.get(`/playlists?playlistId=${this.props._id}&authorId=${this.props.userId}`)
    .then(response => {
      console.log(response);
      this.setState({
        ...response.data[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onMouseOver = () => {
    this.setState({
      hover: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      hover: false
    })
  }

  onPlay = () => {
    this.props.history.push(`/play/music/${this.props._id}`, {
      playingQueue: this.state.musics,
      playingIndex: 0
    });
  }

  deletePlaylist = () => {
    axios.delete(`/playlists?playlistId=${this.state._id}&authorId=${this.props.userId}`)
    .then(response => {
      this.props.onDelete();
    })
    .catch(err => {
      console.log(err);
    })
  }

  onCloseDialog = () => {
    this.setState({
      editing: false
    })
  }

  onEdit = () => {
    this.setState({
      editing: true
    })
  }

  render() {
    return (
      <div className={classes.playlist} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <div className={classes.imgContainer}>
          <img alt={this.props.name} src={this.props.thumbnail} className={classes.thumbnail} ></img>
          {this.state.hover ? (<div className={classes.playIcon}>
            <Icon onClick={this.onPlay}>
              play_circle_filled_white
            </Icon>
            <Icon className={classes.edit} onClick={this.onEdit}>edit</Icon>
            <Icon className={classes.close} onClick={this.deletePlaylist}>close</Icon>
          </div>) : null}
        </div>
        <div className={classes.playlistName}>
          {this.props.name}
        </div>
        <Dialog open={this.state.editing} onBackdropClick={this.onCloseDialog}>
          nani
        </Dialog>
      </div>
    )
  }
}

export default withRouter(PlaylistItem);