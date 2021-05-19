import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ExchangeCurrencies, BankAccount, NotFound } from 'pages';

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={BankAccount}></Route>
      <Route path="/exchange-currencies" component={ExchangeCurrencies}></Route>
      <Route path="" component={NotFound}></Route>
    </Switch>
  </Router>
);
