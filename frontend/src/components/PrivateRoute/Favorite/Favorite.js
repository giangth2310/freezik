import React from 'react';
import { Component } from 'react';
import classes from './Favorite.module.css';
import Song from '../../Home/Song/Song';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';

class Favorite extends Component {
  state = {
    favorite: []
  }

  componentDidMount() {
    axios.get(`/favorite?authorId=${this.props.auth._id}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        favorite: response.data.musics
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  onPlayAll = () => {
    this.props.history.push(`/play/music/${this.state.favorite[0]._id}`, {
      playingQueue: this.state.favorite,
      playingIndex: 0
    })
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <span>Favorite</span>
        </div>
        <div className={classes.content}>
          <div className={classes.playAll} onClick={this.onPlayAll}>
            <Icon>play_arrow</Icon>
            Play all
          </div>
          <Grid container>
            {this.state.favorite.map((el, index) => {
              return (
                <Grid key={index} item xs={3}>
                  <Song {...el}></Song>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

export default Favorite;