import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'styles';
import { Currencies, AccountType } from 'types';
import { ExchangeCurrencies, BankAccount, NotFound } from 'pages';
import { StyledPageLayout } from './App.styled';

interface BankAccountContextType {
  bankAccount: AccountType;
  setBankAccount: (value: AccountType) => void;
}

export const BankAccountContext = createContext<BankAccountContextType>(
  {} as BankAccountContextType
);

export const App = () => {
  const [bankAccount, setBankAccount] = useState<AccountType>({
    [Currencies.EUR]: 144.46,
    [Currencies.GBP]: 98.22,
    [Currencies.USD]: 78.34,
  });

  return (
    <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
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
    </BankAccountContext.Provider>
  );
};
