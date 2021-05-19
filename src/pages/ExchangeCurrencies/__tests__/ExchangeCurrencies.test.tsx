import React from 'react';
import renderer from 'react-test-renderer';
import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { bankAccount } from 'utils';
import { BankAccountContext } from '../../../App';
import { ExchangeCurrencies } from '../ExchangeCurrencies';

const setBankAccount = jest.fn();

describe('<ExchangeCurrencies />', () => {
  it('renders correctly', async () => {
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

  it('redirects to the root page when user clicks on the Cancel button', async () => {
    const { queryByText, getByText } = render(
      <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
        <Router>
          <ExchangeCurrencies />
        </Router>
      </BankAccountContext.Provider>
    );

    expect(queryByText('Cancel')).toBeTruthy();

    act(() => {
      fireEvent.click(getByText('Cancel'));
    });

    expect(global.window.location.pathname).toEqual('/');
  });

  it('redirects to the root page when user clicks on the Exchange button', async () => {
    const { queryByText, getByText } = render(
      <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
        <Router>
          <ExchangeCurrencies />
        </Router>
      </BankAccountContext.Provider>
    );

    expect(queryByText('Exchange')).toBeTruthy();

    act(() => {
      fireEvent.click(getByText('Exchange'));
    });

    expect(global.window.location.pathname).toEqual('/');
  });
});
