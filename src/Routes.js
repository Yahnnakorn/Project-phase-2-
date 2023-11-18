// Routes.js
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './main/Homepage';
import Register from './src/Register';
import User from './main/User';

const Routes = () => {
  return (
    <Switch>
      <Route path="/homepage" component={Homepage} />
      <Route path="/register" component={Register} />
      <Route path="/user" component={User} />
      <Redirect from="/" to="/homepage" />
    </Switch>
  );
};

export default Routes;
