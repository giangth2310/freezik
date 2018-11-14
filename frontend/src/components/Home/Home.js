import React from 'react';
import { Component } from 'react';
import classes from './Home.module.css';
import axios from 'axios';

class Home extends Component {
  componentDidMount() {
    axios.get('/home/top-authors')
      .then(resp => {
        console.log(resp)
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

          </div>
        </div>
      </div>
    )
  }
}

export default Home;