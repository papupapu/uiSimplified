import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import UiSimplified from './UiSimplified';

const BasicExample = () => (
  <Router>
    <div>
    	<UiSimplified />
    </div>
  </Router>
);

export default BasicExample;