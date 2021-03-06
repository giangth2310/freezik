import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import classes from './Play.module.css';
import PlayLoader from './PlayLoader/PlayLoader';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { Avatar } from '@material-ui/core';
import TextareaAutosize from 'react-autosize-textarea';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist';

class Play extends Component {
  state = {
    playingQueue: [],
    comments: [],
    cmtVal: '',
    playing: true,
    loop: false,
    volume: 0.8,
    played: 0,
    playedSeconds: 0.00,
    showAddPlaylist: false,
    updating: false
  }

  fetchData = async () => {
    const { _id } = this.props.match.params;
    try {
      const response = await axios.get(`/musicData`, {
        params: {
        musicId: _id,
        authorId: this.props.auth._id
      }})
      delete response.data.comments;
      this.setState({
        ...response.data,
        played: 0,
        playedSeconds: 0.00,
      })
    } catch (err) {
      console.log(err);
    }
  }

  fetchComment = async () => {
    const { _id } = this.props.match.params;
    try {
      const response = await axios.get(`/comments?musicId=${_id}`)
      this.setState({
        comments: response.data
      })
    } catch (err) {
      console.log(err);
    }
  }

  fetchRecommended = async () => {
    const { _id } = this.props.match.params;
    try {
      if (!this.props.location.state) {
        const response = await axios.get(`/home/recommended-songs?_id=${_id}`)
        let playingIndex = response.data.findIndex(el => el._id === _id);
        let playingQueue = [...response.data];
        if (playingIndex === -1) {
          const { artist, authorId, fileName, image, name, views,_id } = this.state;
          playingIndex = 0;
          playingQueue = [{
            artist, authorId, fileName, image, name, views,_id
          }, ...response.data];
        }
        this.setState({
          playingQueue,
          playingIndex
        })
      } else {
        setTimeout(() => {
          this.setState({
            ...this.props.location.state
          })
        }, 0);
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchData();
    this.fetchComment();
    this.fetchRecommended();
  }

  componentDidUpdate() {
    if (this.state._id !== this.props.match.params._id && !this.state.updating) {
      this.setState({
        updating: true
      }, async () => {
        await this.fetchData();
        await this.fetchComment();
        await this.fetchRecommended();
        this.setState({
          updating: false
        })
      })
    }
  }

  toggleAddPlaylist = () => {
    this.setState(prevState => {
      return {
        showAddPlaylist: !prevState.showAddPlaylist
      }
    })
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
    const { playingQueue, playingIndex } = this.state;
    const prevIndex = Math.max(0, playingIndex - 1);
    this.props.history.push(`/play/music/${playingQueue[prevIndex]._id}`, {
      playingQueue: this.state.playingQueue,
      playingIndex: prevIndex
    });
  }

  onSKipNext = () => {
    const { playingQueue, playingIndex } = this.state;
    const nextIndex = Math.min(playingQueue.length - 1, playingIndex + 1);
    this.props.history.push(`/play/music/${playingQueue[nextIndex]._id}`, {
      playingQueue: this.state.playingQueue,
      playingIndex: nextIndex
    });
  }

  playPause = () => {
    this.setState(prevState => {
      return {
        playing: !prevState.playing
      }
    })
  }

  onQueueItemClick = (index) => {
    this.props.history.push(`/play/music/${this.state.playingQueue[index]._id}`, {
      playingQueue: this.state.playingQueue,
      playingIndex: index
    });
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
    if (!this.props.auth.isAuthenticated) {
      this.props.showLogin();
      return;
    }
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

    const addToPlaylist = this.state.showAddPlaylist ? (
      <AddToPlaylist userId={this.props.auth._id} musicId={this.props.match.params._id} ></AddToPlaylist>
    ) : null;

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
              onEnded={() => this.onSKipNext()}
              ref={player => this.player = player} ></ReactPlayer>
            <div className={classes.controller}>
              <Icon onClick={this.onSkipPrev}>skip_previous</Icon>
              <Icon onClick={this.playPause}>{this.state.playing ? 'pause' : 'play_arrow'}</Icon>
              <Icon onClick={this.onSKipNext}>skip_next</Icon>
              <span>{`${('0' + Math.floor(this.state.playedSeconds/60)).slice(-2)}:${('0' + Math.floor(this.state.playedSeconds%60)).slice(-2)}`}</span>
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
              <div className={classes.addToPlaylist} onClick={this.toggleAddPlaylist}>
                <Icon>playlist_add</Icon>
                Add to playlist
              </div>
            </div>
            <div className={classes.views}>
              <Icon>headset</Icon>
              {this.state.views}
            </div>
          </div>
          {addToPlaylist}
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
            {this.state.playingQueue.map((el, index) => {
              return (
                <div className={`${classes.queueItem} ${index === this.state.playingIndex ? classes.playing : ''}`} key={index} onClick={() => this.onQueueItemClick(index)}>
                  {index === this.state.playingIndex ? <Icon>play_arrow</Icon> : <span></span>}
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