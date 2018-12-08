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
    cmtVal: '',
    playing: true,
    loop: false,
    volume: 0.8,
    played: 0,
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    axios.get(`/musicData`, {
      params: {
      musicId: _id,
      authorId: this.props.auth._id
    }})
    .then(response => {
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
      this.setState({
        comments: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(`/home/recommended-songs?_id=${_id}`)
    .then(response => {
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

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  onSkipPrev = () => {
    const { recommended } = this.state;
    this.props.history.push(`/play/music/${recommended[recommended.length - 1]._id}`);
  }

  onSKipNext = () => {
    const { recommended } = this.state;
    this.props.history.push(`/play/music/${recommended[0]._id}`);
  }

  playPause = () => {
    this.setState(prevState => {
      return {
        playing: !prevState.playing
      }
    })
  }

  onQueueItemClick = (id) => {
    this.props.history.push(`/play/music/${id}`);
  }

  onCmtValChange = e => {
    this.setState({
      cmtVal: e.target.value
    })
  }

  onAddComment = e => {
    e.preventDefault();
    if (!this.props.auth.isAuthenticated) {
      this.props.showLogin();
      return;
    }
    axios.post('/comments', {
      musicId: this.props.match.params._id,
      authorId: this.props.auth._id,
      content: this.state.cmtVal
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        comments: response.data,
        cmtVal: ''
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onFavorite = () => {
    this.setState({
      favorite: 'true'
    })
    axios.post('/favorite', {
      authorId: this.props.auth._id,
      musicId: this.state._id
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onLoopClick = () => {
    this.setState({
      loop: true
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

    let favoriteButton = (
      <div className={classes.favorite} onClick={this.onFavorite}>
        <Icon>favorite_border</Icon>
        Favorite
      </div>
    )

    if (this.state.favorite === 'true') {
      favoriteButton = (
        <div className={`${classes.favorite} ${classes.favorited}`}>
          <Icon>favorite</Icon>
          Favorited!
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
            <ReactPlayer url={`http://localhost:5000/api/music?_id=${this.state._id}`}
              playing={this.state.playing}
              loop={this.state.loop}
              volume={this.state.volume}
              onProgress={this.onProgress}
              width='0'
              height='0'
              ref={player => this.player = player} ></ReactPlayer>
            <div className={classes.controller}>
              <Icon onClick={this.onSkipPrev}>skip_previous</Icon>
              <Icon onClick={this.playPause}>{this.state.playing ? 'pause' : 'play_arrow'}</Icon>
              <Icon onClick={this.onSKipNext}>skip_next</Icon>
              <input
                className={classes.seekInput}
                type='range' min={0} max={1} step='any'
                value={this.state.played}
                onChange={this.onSeekChange}
                onMouseUp={this.onSeekMouseUp}
                onMouseDown={this.onSeekMouseDown}
              />
              <Icon>volume_up</Icon>
              <input 
                className={classes.volumeInput}
                type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} />
              <Icon onClick={this.onLoopClick}>loop</Icon>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <div className={classes.btns}>
              {favoriteButton}
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
          <form className={classes.writeCmt} onSubmit={this.onAddComment}>
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