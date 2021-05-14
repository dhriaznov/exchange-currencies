import React from 'react';
import { Button, Row, Col } from 'antd';

import { StyledHeader } from './App.styled';
import { Currencies } from 'types';
import { ExchangeCurrenciesForm } from 'ExchangeCurrenciesForm';

const bankAccount: {
  [key in keyof typeof Currencies]: number
} = {
  [Currencies.EUR]: 144.46,
  [Currencies.GBP]: 98.22,
  [Currencies.USD]: 78.34,
};

export const App = () => {
  return (
    <div className="App">
      <StyledHeader>
        <Row align="middle" justify="space-between">
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col>
            <div>1 eur = 1.21 usd</div>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" form="ExchangeCurrencies">Exchange</Button>
          </Col>
        </Row>
      </StyledHeader>
      <ExchangeCurrenciesForm bankAccount={bankAccount} />
    </div>
  );
}
