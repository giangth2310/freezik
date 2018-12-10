import React from 'react';
import { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { parse_query_string } from '../../util';
import axios from 'axios';
import classes from './Search.module.css';
import { Divider, Icon } from '@material-ui/core';

class Search extends Component {
  state = {
    results: []
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const params = parse_query_string(this.props.location.search);
    axios.get(`/search?q=${params.q}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        results: response.data,
        q: params.q
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidUpdate() {
    const params = parse_query_string(this.props.location.search);
    if (this.state.q !== params.q) {
      this.fetchData();
    }
  }

  onItemClick = (id) => {
    this.props.history.push(`/play/music/${id}`);
  }

  render() {
    const params = parse_query_string(this.props.location.search);
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.title}>Search results for "<span>{params.q}</span>"</div>
          <Divider></Divider>
          {this.state.results.map((el, index) => {
            return (
              <Fragment key={index}>
                <div className={classes.item} onClick={() => this.onItemClick(el._id)}>
                  <img src={el.image} alt={el.name} className={classes.image}></img>
                  <div>
                    <div className={classes.name}>{el.name}</div>
                    <div>{el.artist}</div>
                  </div>
                  <div className={classes.views}>
                    <Icon>headset</Icon>
                    {el.views}
                  </div>
                </div>
                <Divider></Divider>
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(Search);