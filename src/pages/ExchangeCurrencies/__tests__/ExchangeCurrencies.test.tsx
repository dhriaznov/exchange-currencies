import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { bankAccount } from 'utils';
import { BankAccountContext } from '../../../App';
import { ExchangeCurrencies } from '../ExchangeCurrencies';

const setBankAccount = jest.fn();

describe('<ExchangeCurrencies />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
          <Router>
            <ExchangeCurrencies />
          </Router>
        </BankAccountContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
