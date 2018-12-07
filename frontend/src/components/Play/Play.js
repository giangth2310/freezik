import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classes from './Play.module.css';
import PlayLoader from './PlayLoader/PlayLoader';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { Avatar } from '@material-ui/core';
import TextareaAutosize from 'react-autosize-textarea';

class Play extends Component {
  state = {
    recommended: [],
    comments: [],
    cmtVal: ''
  }

  componentDidMount() {
    const { _id } = this.props.match.params;

    axios.get(`/musicData?_id=${_id}`)
    .then(response => {
      console.log(response.data);
      delete response.data.comments;
      this.setState({
        ...response.data
      })
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(`/comments?musicId=${_id}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        comments: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(`/home/recommended-songs?_id=${_id}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        recommended: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidUpdate() {
    if (this.state._id !== this.props.match.params._id) {
      this.componentDidMount();
    }
  }

  onQueueItemClick = (id) => {
    this.props.history.push(`/play/music/${id}`);
  }

  onCmtValChange = e => {
    this.setState({
      cmtVal: e.target.value
    })
  }

  render() {
    if (!this.state.name) {
      return <PlayLoader></PlayLoader>
    }

    let comments = (
      <div className={classes.noComment}>
        No comment for this song. Be the first one!
      </div>
    )

    if (this.state.comments.length !== 0) {
      comments = (
        <div className={classes.cmtContainer}>
          {this.state.comments.map(el => {
            const cmtDate = new Date(el.date);
            return (
              <div key={el._id} className={classes.cmt}>
                <Avatar alt={el.name} src={el.avatar} className={classes.avatar}></Avatar>
                <div className={classes.cmtContent}>
                  <div className={classes.cmtHeader}>
                    <span style={{fontWeight: 'bold'}}>{el.name}</span>
                    <span style={{fontWeight: 300}}>
                      {cmtDate.toDateString()}
                    </span>
                  </div>
                  <div>
                    {el.content}
                  </div>
                </div>             
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.name}>
            {this.state.name}
          </div>
          <div className={classes.artist}>
            {this.state.artist}
          </div>
          <div className={classes.player}>
            <img src={this.state.image} alt={this.state.name} className={classes.image}></img>
            <div className={classes.controller}>

            </div>
          </div>
          <div className={classes.btnContainer}>
            <div className={classes.btns}>
              <div className={classes.favorite}>
                <Icon>favorite_border</Icon>
                Favorite
              </div>
              <div className={classes.addToPlaylist}>
                <Icon>playlist_add</Icon>
                Add to playlist
              </div>
            </div>
            <div className={classes.views}>
              <Icon>headset</Icon>
              {this.state.views}
            </div>
          </div>
          <form className={classes.writeCmt}>
            <div className={classes.formContent}>
              <Avatar alt={this.props.auth.name} src={this.props.auth.avatar} className={classes.avatar}></Avatar>
              <TextareaAutosize rows={1} 
                value={this.state.cmtVal}
                onChange={this.onCmtValChange}
                placeholder='Write a comment...' className={classes.cmtArea} /> 
            </div>
            <div className={classes.formAction}>
              <button className={classes.cmtButton} type='submit'>
                <Icon>comment</Icon>
                Comment
              </button>
            </div>
          </form>
          {comments}
        </div>
        <div className={classes.right}>
          <div className={classes.playingQueue}>
            <Icon>queue_music</Icon>
            Playing Queue
          </div>
          <div className={classes.queue}>
            <div className={`${classes.playing} ${classes.queueItem}`}>
              <Icon>play_arrow</Icon>
              <div className={classes.itemContent}>
                <div className={classes.itemName}>
                  {this.state.name}
                </div>
                <div className={classes.itemArtist}>
                  {this.state.artist}
                </div>
              </div>
            </div>
            {this.state.recommended.map(el => {
              return (
                <div className={classes.queueItem} key={el._id} onClick={() => this.onQueueItemClick(el._id)}>
                  <span></span>
                  <div className={classes.itemContent}>
                    <div className={classes.itemName}>
                      {el.name}
                    </div>
                    <div className={classes.itemArtist}>
                      {el.artist}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Play;