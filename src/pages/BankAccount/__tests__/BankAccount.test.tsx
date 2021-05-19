import React from 'react';
import renderer from 'react-test-renderer';
import { act, fireEvent, render } from '@testing-library/react';
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

  it('redirects to /exchange-currencies page when user clicks on the Exchange button', () => {
    const { queryByText, getByText } = render(
      <BankAccountContext.Provider value={{ bankAccount, setBankAccount }}>
        <Router>
          <BankAccount />
        </Router>
      </BankAccountContext.Provider>
    );

    expect(queryByText('Exchange')).toBeTruthy();

    act(() => {
      fireEvent.click(getByText('Exchange'));
    });

    expect(global.window.location.pathname).toEqual('/exchange-currencies');
  });
});
