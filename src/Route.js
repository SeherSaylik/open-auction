import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Admin'
import OpenAuction from './App'

export default function Album() {
  return (
  <Router>
      <Switch>
        <Route path="/" exact component={OpenAuction}></Route>
        <Route path="/admin" component={Admin}></Route>
       </Switch>
  </Router>
  )
}