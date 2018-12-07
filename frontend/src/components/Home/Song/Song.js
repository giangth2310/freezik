import React, { Component } from 'react';
import classes from './Song.module.css';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';

class Song extends Component {
  state = {
    hover: false
  }

  onMouseOver = () => {
    this.setState({
      hover: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      hover: false
    })
  }

  onClick = () => {
    this.props.history.push(`/play/music/${this.props._id}`);
  }

  render() {
    return (
      <div className={classes.song} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
        <div className={classes.imgContainer}>
          <img alt={this.props.name} src={this.props.image} className={classes.songImg} ></img>
          {this.state.hover ? (<div className={classes.playIcon}>
            <Icon>
              play_circle_filled_white
            </Icon>
          </div>) : null}
        </div>
        <div className={classes.songName}>
          {this.props.name}
        </div>
        <div>
          {this.props.artist}
        </div>
      </div>
    )
  }
}

export default withRouter(Song);