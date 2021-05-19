import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { bankAccount } from 'utils';
import { BankAccountContext } from '../../../App';
import { BankAccount } from '../BankAccount';

const setBankAccount = jest.fn();

describe('<BankAccount />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
          <Router>
            <BankAccount />
          </Router>
        </BankAccountContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
