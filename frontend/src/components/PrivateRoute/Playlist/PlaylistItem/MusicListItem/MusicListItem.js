import React, { Component } from 'react';
import classes from './MusicListItem.module.css';
import Icon from '@material-ui/core/Icon';

class MusicListItem extends Component {
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

  render() {
    return (
      <div className={classes.container}
        onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <span className={classes.index}>{this.props.index + 1}</span>
        <div>
          <div className={classes.name}>{this.props.name}</div>
          <div>{this.props.artist}</div>
        </div>
        {this.state.hover ? (
          <Icon className={classes.delete} onClick={() => this.props.onDelete(this.props._id)}>close</Icon>
        ) : null}
      </div>
    )
  }
}

export default MusicListItem;