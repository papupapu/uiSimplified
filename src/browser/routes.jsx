import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import UiSimplified from './UiSimplified';

// http://stackoverflow.com/questions/33996484/using-multiple-layouts-for-react-router-components

const UiRouter = () => (
  <Router>
    <UiSimplified />
  </Router>
);

export default UiRouter;