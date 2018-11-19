import React from 'react';
import Router from './Router';
import { Component } from 'react';
import classes from './App.module.css';
import Header from './containers/HeaderContainer';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.container}>
          <div className={classes.App}>
            <Header></Header>
            <Router></Router>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;