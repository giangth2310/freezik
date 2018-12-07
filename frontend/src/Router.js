import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import PrivateRoute from './containers/PrivateRouteContainer';
import Play from './containers/PlayContainer';

const rootRouter = () => (
  <Switch>
    <Route exact path='/' component={Home} ></Route>
    <Route exact path='/play/music/:_id' component={Play}></Route>
    <Route path='/user' component={PrivateRoute}></Route>
  </Switch>
)

export default rootRouter;