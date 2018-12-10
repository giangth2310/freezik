import React from 'react';
import { Component } from 'react';
import classes from './Home.module.css';
import axios from 'axios';
import Author from './Author/Author';
import AuthorLoader from './AuthorLoader/AuthorLoader';
import Grid from '@material-ui/core/Grid';
import Song from './Song/Song';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  state = {
    topAuthors: [{}, {}, {}, {}, {}],
    recommendedSongs: [],
    popularSongs: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  }

  componentDidMount() {
    axios.get('/home/top-authors')
      .then(resp => {
        this.setState({
          topAuthors: resp.data.slice(0, 5)
        })
      })
      .catch(err => console.log(err))
    axios.get('/home/recommended-songs')
      .then(resp => {
        console.log(resp.data);
        this.setState({
          recommendedSongs: resp.data
        })
      })
      .catch(err => console.log(err))
    axios.get('/home/popular-songs')
      .then(resp => {
        console.log(resp.data);
        this.setState({
          popularSongs: resp.data
        })
      })
      .catch(err => console.log(err))
  }

  onPlayMusic = (id) => {
    if (id) {
      this.props.history.push(`/play/music/${id}`);
    } 
  }

  onAuthorClick = (name) => {
    this.props.history.push(`/search?q=author:${name}`);
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.topAuthors}>
            Top Authors
          </div>
          <div className={classes.listAuthors}>
            {this.state.topAuthors.map((el, index) => {
              if (!el._id) {
                return <AuthorLoader key={index} ></AuthorLoader>
              }
              return (
                <Author key={index} {...el} onClick={() => this.onAuthorClick(el.name)} ></Author>
              )
            })}
          </div>
          <div className={classes.recommended}>
            Recommended songs
          </div>
          <Grid container>
            {this.state.recommendedSongs.map((el, index) => {
              return (
                <Grid key={index} item xs={3} style={{
                  padding: '0 20px'
                }}>
                  <Song {...el}></Song>
                </Grid>
              )
            })}
          </Grid>
        </div>
        <div className={classes.right}>
          <div className={classes.popular}>
            Popular songs
          </div>
          {this.state.popularSongs.map((el, index) => {
            return (
              <div key={index} className={classes.popularItem} onClick={() => this.onPlayMusic(el._id)}>
                <div className={classes.number}>
                  <span>
                    {index + 1}
                  </span>
                </div>
                <div className={classes.itemInfo}>
                  <div className={classes.itemName}>
                    {el.name}
                  </div>
                  <div>
                    {el.artist}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(Home);