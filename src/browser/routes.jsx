import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import UiSimplified from './UiSimplified';

// http://stackoverflow.com/questions/33996484/using-multiple-layouts-for-react-router-components
// http://stackoverflow.com/questions/43333920/multiple-layouts-with-react-router-v4?noredirect=1&lq=1
// https://reacttraining.com/react-router/native/example/route-config

const UiRouter = () => (
  <Router>
    <UiSimplified />
  </Router>
);

export default UiRouter;
