import React, { createContext, useState } from 'react';

import { GlobalStyles } from 'styles';
import { AccountType } from 'types';
import { bankAccount as bankAccountData } from 'utils';
import { AppRouter } from './AppRouter';
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
        <AppRouter />
      </StyledPageLayout>
    </BankAccountContext.Provider>
  );
};
