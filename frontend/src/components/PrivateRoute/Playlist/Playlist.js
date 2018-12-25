import React from 'react';
import { Component } from 'react';
import classes from './Playlist.module.css';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import PlaylistItem from './PlaylistItem/PlaylistItem';

class Playlist extends Component {
  state = {
    playlist: []
  }

  componentDidMount() {
    axios.get(`/playlists?authorId=${this.props.auth._id}`)
    .then(response => {
      this.setState({
        playlist: response.data.reverse()
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  addNewPlaylist = () => {
    axios.post('/playlists', {
      name: 'New playlist ' + this.state.playlist.length,
      authorId: this.props.auth._id
    })
    .then(response => {
      this.setState(prevState => {
        return {
          playlist: [response.data, ...prevState.playlist]
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  deletePlaylist = (id) => {
    this.setState(prevState => {
      const newPlaylist = [...prevState.playlist];
      newPlaylist.splice(newPlaylist.findIndex(el => el._id === id), 1);
      return {
        playlist: newPlaylist
      }
    })
  }

  updatePlaylist = (index, info) => {
    const newPlaylist = [...this.state.playlist];
    newPlaylist[index] = {
      ...this.state.playlist,
      ...info
    }
    this.setState({
      playlist: newPlaylist
    })
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Playlist</span>
        </div>
        <div className={classes.content}>
          <Grid container>
            <Grid item xs={3}>
              <div className={classes.newPlaylist} onClick={this.addNewPlaylist}>
                <Icon>add</Icon>
                New playlist
              </div>
            </Grid>
            {this.state.playlist.map((el, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <PlaylistItem {...el} userId={this.props.auth._id} 
                    onDelete={() => this.deletePlaylist(el._id)}
                    updatePlaylist={(info) => this.updatePlaylist(index, info)} ></PlaylistItem>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

export default Playlist;