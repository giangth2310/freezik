import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home/Home';

const rootRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} ></Route>
    </Switch>
  </Router>
)

export default rootRouter;