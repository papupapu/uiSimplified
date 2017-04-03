import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <p>home</p>
);

const BasicExample = () => (
  <Router>
    <Route exact path="/" component={Home}/>
  </Router>
);

export default BasicExample;