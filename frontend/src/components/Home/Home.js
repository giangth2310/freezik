import React from 'react';
import { Component } from 'react';
import classes from './Home.module.css';
import axios from 'axios';
import Author from './Author/Author';
import AuthorLoader from './AuthorLoader/AuthorLoader';

class Home extends Component {
  state = {
    topAuthors: [{}, {}, {}, {}, {}]
  }

  componentDidMount() {
    axios.get('/home/top-authors')
      .then(resp => {
        this.setState({
          topAuthors: resp.data.slice(0, 5)
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.topAuthors}>
            Top Authors
          </div>
          <div className={classes.listAuthors}>
            {this.state.topAuthors.map(el => {
              if (!el._id) {
                return <AuthorLoader></AuthorLoader>
              }
              return (
                <Author key={el._id} {...el} ></Author>
              )
            })}
          </div>
          <div className={classes.recommended}>
            Recommended songs
          </div>
        </div>
      </div>
    )
  }
}

export default Home;