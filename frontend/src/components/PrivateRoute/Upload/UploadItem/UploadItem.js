import React, { Component, Fragment } from 'react';
import classes from './UploadItem.module.css';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import axios from 'axios';

class UploadItem extends Component {
  state = {
    hover: false,
    open: false
  }

  componentWillMount() {
    const { image, artist, name } = this.props;
    this.setState({
      image, artist, name
    })
  }

  closeDialog = () => {
    const { image, artist, name } = this.props;
    this.setState({
      open: false,
      name, artist, image
    })
  }

  openDialog = () => {
    this.setState({
      open: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      hover: false
    })
  }

  onMouseOver = () => {
    this.setState({
      hover: true
    })
  }

  onClick = () => {
    this.props.history.push(`/play/music/${this.props._id}`);
  }

  onNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  onArtistChange = e => {
    this.setState({
      artist: e.target.value
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
        image: reader.result,
        newThumbnail: file
      })
    }, false);

    reader.readAsDataURL(file);
  }

  onSave = () => {
    const formData = new FormData();
    if (this.state.newThumbnail) {
      formData.append('image', this.state.newThumbnail, this.state.newThumbnail.name);
    }
    formData.append('name', this.state.name);
    formData.append('artist', this.state.artist);
    formData.append('musicId', this.props._id);
    axios.put(`/musics`, formData)
    .then(response => {
      this.setState({
        newThumbnail: null,
        open: false
      })
      this.props.updateSong(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Fragment>
        <div className={classes.item} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} >
          <img src={this.props.image} alt={this.props.name} className={classes.image}></img>
          <div className={classes.content} onClick={this.onClick}>
            <div className={classes.name}>{this.props.name}</div>
            <div>{this.props.artist}</div>
          </div>
          <div className={classes.views}>
            <Icon>headset</Icon>
            {this.props.views}
          </div>
          {this.state.hover ? (
            <Fragment>
              <Icon className={classes.editBtn} onClick={this.openDialog}>edit</Icon>
              <Icon className={classes.deleteBtn} onClick={this.props.onDelete}>close</Icon>
            </Fragment>
          ) : null}
        </div>
        <Divider></Divider>
        <Dialog open={this.state.open} onBackdropClick={this.closeDialog}>
          <DialogTitle>Edit song data</DialogTitle>
          <DialogContent className={classes.dlContent}>
            <div>
              <img src={this.state.image} alt={this.state.name} className={classes.dlThumbnail}></img>
              <input
                style={{ display: 'none' }}
                type='file'
                onChange={this.onThumbnailChange}
                ref={node => this.thumbnailInput = node}></input>
              <div className={classes.thumbnailUpload} onClick={() => this.thumbnailInput.click()} >
                <span>Upload new picture</span>
              </div>
            </div>
            <div className={classes.right}>
              <TextField 
                variant='outlined'
                onChange={this.onNameChange}
                className={classes.nameInput}
                label='Song name'
                value={this.state.name}></TextField>
              <TextField 
                onChange={this.onArtistChange}
                className={classes.artistInput}
                variant='outlined'
                label='Artist'
                value={this.state.artist}></TextField>
            </div>
          </DialogContent>
          <DialogActions>
            <div className={classes.closeBtn} onClick={this.closeDialog}>Close</div>
            <button className={classes.saveBtn} onClick={this.onSave}>
              Save
            </button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default withRouter(UploadItem);