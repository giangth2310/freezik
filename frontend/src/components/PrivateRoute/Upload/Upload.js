import React from 'react';
import { Component } from 'react';
import classes from './Upload.module.css';
import axios from 'axios';
import UploadItem from './UploadItem/UploadItem';
import { Divider, Icon, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@material-ui/core';

class Upload extends Component {
  state = {
    upload: [],
    open: false,
    name: '',
    artist: '',
    image: null,
    imageFile: null,
    file: null
  }

  componentDidMount() {
    axios.get(`/musics?authorId=${this.props.auth._id}`)
    .then(response => {
      this.setState({
        upload: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onDelete = (index) => {
    axios.delete(`/musics?musicId=${this.state.upload[index]._id}`)
    .then(response => {
      const newUpload = [...this.state.upload].filter((el, i) => i !== index);
      this.setState({
        upload: newUpload
      })
    })
  }

  closeDialog = () => {
    this.setState({
      open: false,
      name: '',
      artist: '',
      image: null,
      imageFile: null,
      file: null
    })
  }

  openDialog = () => {
    this.setState({
      open: true
    })
  }

  updateSong = (index, data) => {
    const newUpload = [...this.state.upload];
    newUpload[index] = {
      ...data
    }
    this.setState({
      upload: newUpload
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
        imageFile: file
      })
    }, false);

    reader.readAsDataURL(file);
  }

  onSelectFile = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  onUpload = () => {
    const { name, artist, imageFile, file, upload } = this.state;
    if (name === '' || artist === '' || imageFile === null || file === null) {
      return
    }
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    formData.append('music', file, file.name);
    formData.append('name', name);
    formData.append('artist', artist);
    formData.append('authorId', this.props.auth._id);
    axios.post('/musics', formData)
    .then(response => {
      const newUpload = [{
        ...response.data
      }, ...upload];
      this.setState({
        upload: newUpload
      })
      this.closeDialog();
    })
    .catch(err => {
      console.log(err);
    })
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

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Upload</span>
        </div>
        <div className={classes.content}>
          <div className={classes.uploadBtn} onClick={this.openDialog}>
            <Icon>cloud_upload</Icon>
            Upload a song
          </div>
          <Divider></Divider>
          {this.state.upload.map((el, index) => {
            return (
              <UploadItem key={index} {...el}
                updateSong={(data) => this.updateSong(index, data)}
                onDelete={() => this.onDelete(index)}></UploadItem>
            )
          })}
        </div>
        <Dialog open={this.state.open} onBackdropClick={this.closeDialog}>
          <DialogTitle>Upload a song</DialogTitle>
          <div className={classes.note}>
            <b>Note: </b> You must fullfill all fields to upload a song
          </div>
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
              <TextField
                onChange={this.onSelectFile}
                type='file' variant='outlined'></TextField>
            </div>
          </DialogContent>
          <DialogActions>
            <div className={classes.closeBtn} onClick={this.closeDialog}>Close</div>
            <button className={classes.dlUploadBtn} onClick={this.onUpload}>
              Upload
            </button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Upload;