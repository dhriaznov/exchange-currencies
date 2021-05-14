import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Currencies } from 'types';
import { GlobalStyles } from 'styles';
import { ExchangeCurrenciesForm } from 'ExchangeCurrenciesForm';
import { StyledPageLayout, StyledHeader } from './App.styled';

const bankAccount: {
  [key in keyof typeof Currencies]: number
} = {
  [Currencies.EUR]: 144.46,
  [Currencies.GBP]: 98.22,
  [Currencies.USD]: 78.34,
};

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

interface RateDataResponse {
  data: {
    base: Currencies,
    rates: { [key: string]: number }
  }
}

export const App = () => {
  const [isRateLoading, setIsRateLoading] = useState<boolean>(false);
  const [rateData, setRateData] = useState<{} | null>(null);

  useEffect(() => {
    setIsRateLoading(true);

    Promise.all(
      Object.keys(Currencies).map(
        currency => axios.get(`https://api.exchangerate.host/latest`, { params: { base: currency, symbols: Object.keys(Currencies).join(',') } }))
    ).then((values) => {
      const result: any = {};

      values.forEach((response: RateDataResponse) => {
        result[response.data.base] = response.data.rates;
      });
      setRateData(result);
    }).finally(() => {
      setIsRateLoading(false);
    });
  }, []);

  console.log('isRateLoading', isRateLoading);
  console.log('rateData', rateData);

  return (
    <StyledPageLayout>
      <GlobalStyles />
      <StyledHeader>
          <Row align="middle" justify="space-between">
            <Col>
              <Button>Cancel</Button>
            </Col>
            <Col>
              {!!rateData ? <div>1 eur = 1.21 usd</div> : <Spin indicator={antIcon} />}
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" form="ExchangeCurrencies">Exchange</Button>
            </Col>
          </Row>
        </StyledHeader>
        <ExchangeCurrenciesForm bankAccount={bankAccount} />
    </StyledPageLayout>
  );
};
