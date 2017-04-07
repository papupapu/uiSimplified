import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import UiSimplified from './UiSimplified';

const BasicExample = () => (
  <Router>
    <UiSimplified />
  </Router>
);

export default BasicExample;