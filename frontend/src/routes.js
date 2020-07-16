import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomePage from './pages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;