import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'styles';
import { ExchangeCurrencies, BankAccount, NotFound } from 'pages';
import { StyledPageLayout } from './App.styled';

export const App = () => {
  return (
    <StyledPageLayout>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={BankAccount}></Route>
          <Route path="/exchange-currencies" component={ExchangeCurrencies}></Route>
          <Route path="" component={NotFound}></Route>
        </Switch>
      </Router>
    </StyledPageLayout>
  );
};
