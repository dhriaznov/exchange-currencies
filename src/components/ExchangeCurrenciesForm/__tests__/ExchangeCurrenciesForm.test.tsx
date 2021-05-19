import React from 'react';
import renderer from 'react-test-renderer';

import { bankAccount } from 'utils';
import { ExchangeCurrenciesForm } from '../ExchangeCurrenciesForm';

const props = {
  onFormSubmit: jest.fn(),
  bankAccount,
  setPickedFromCurrency: jest.fn(),
  setPickedToCurrency: jest.fn(),
};

describe('<ExchangeCurrenciesForm />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ExchangeCurrenciesForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
