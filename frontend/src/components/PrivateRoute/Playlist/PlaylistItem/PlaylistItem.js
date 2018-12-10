import React, { Component } from 'react';
import classes from './PlaylistItem.module.css';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import MusicListItem from './MusicListItem/MusicListItem';

class PlaylistItem extends Component {
  state = {
    hover: false,
    editing: false,
    musics: []
  }

  componentDidMount() {
    axios.get(`/playlists?playlistId=${this.props._id}`)
    .then(response => {
      console.log(response);
      this.setState({
        ...response.data
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

  onThumbnailChange = e => {
    if (e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        thumbnail: reader.result,
        newThumbnail: file
      })
    }, false);

    reader.readAsDataURL(file);
  }

  onNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  delFromPlaylist = (musicId) => {
    this.setState(prevState => {
      const newMusics = prevState.musics.filter(el => el._id !== musicId);
      return {
        musics: newMusics
      }
    })
    axios.delete(`/playlists?playlistId=${this.props._id}&musicId=${musicId}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onSave = () => {
    const formData = new FormData();
    if (this.state.newThumbnail) {
      formData.append('thumbnail', this.state.newThumbnail, this.state.newThumbnail.name);
    }
    formData.append('playlistId', this.state._id);
    formData.append('name', this.state.name);
    axios.put(`/playlists`, formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
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
        <Dialog open={this.state.editing}
          PaperProps={{
            className: classes.dialog
          }}
          onBackdropClick={this.onCloseDialog}>
          <DialogContent className={classes.dialogContent}>
            <div className={classes.dialogLeft}>
              <img src={this.state.thumbnail} alt={this.state.name} className={classes.dlThumbnail}></img>
              <input
                style={{ display: 'none' }}
                type='file'
                onChange={this.onThumbnailChange}
                ref={node => this.thumbnailInput = node}></input>
              <div className={classes.thumbnailUpload} onClick={() => this.thumbnailInput.click()} >
                <span>Upload new picture</span>
              </div>
            </div>
            <div className={classes.dialogRight}>
              <input value={this.state.name} onChange={this.onNameChange} className={classes.dlName}></input>
              <div className={classes.musicList}>
                {this.state.musics.map((el, index) => {
                  return (
                    <MusicListItem key={index} {...el} index={index} onDelete={this.delFromPlaylist}></MusicListItem>
                  )
                })}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className={classes.closeBtn} onClick={this.onCloseDialog}>Close</div>
            <button className={classes.saveBtn} onClick={this.onSave}>
              Save
            </button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(PlaylistItem);