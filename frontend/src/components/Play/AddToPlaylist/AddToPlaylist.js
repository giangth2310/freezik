import React from 'react';
import axios from 'axios';
import { Component, Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import classes from './AddToPlaylist.module.css';
import { Icon } from '@material-ui/core';

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

  onAdd = (index) => {
    this.setState(prevState => {
      const newPlaylist = [...prevState.playlist];
      newPlaylist[index].added = true;
      return {
        playlist: newPlaylist
      }
    })
    axios.post('/playlist', {
      playlistId: this.state.playlist[index]._id,
      musicId: this.props.musicId
    })
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
        <Divider></Divider>
        {this.state.playlist.map((el, index) => {
          return (
            <Fragment key={index}>
              <div className={classes.item}>
                <div className={classes.content}>
                  <img src={el.thumbnail} alt={el.name} className={classes.thumbnail}></img>
                  <span className={classes.name}>{el.name}</span>
                </div>
                <div className={classes.addBtn} onClick={() => this.onAdd(index)}>{el.added ? <Icon>done</Icon> : <span>Add</span>}</div>
              </div>
              <Divider></Divider>
            </Fragment>
          )
        })}
      </div>
    )
  }
}

export default AddToPlaylist;