import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyles } from 'styles';
import { AccountType } from 'types';
import { bankAccount as bankAccountData } from 'utils';
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
  const [bankAccount, setBankAccount] = useState<AccountType>(bankAccountData);

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
