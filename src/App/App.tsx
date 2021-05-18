import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Currencies, CurrenciesType, AccountType, RatesType } from 'types';
import { GlobalStyles } from 'styles';
import { ExchangeCurrenciesForm } from 'ExchangeCurrenciesForm';
import { StyledPageLayout, StyledHeader } from './App.styled';

const bankAccount: AccountType = {
  [Currencies.EUR]: 144.46,
  [Currencies.GBP]: 98.22,
  [Currencies.USD]: 78.34,
};

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

interface RateDataResponse {
  data: {
    base: keyof CurrenciesType;
    rates: RatesType;
  };
}

export const App = () => {
  const [isRateLoading, setIsRateLoading] = useState<boolean>(false);
  const [rateData, setRateData] = useState<RatesType | null>(null);
  const [pickedFromCurrency, setPickedFromCurrency] = useState<Currencies>(Currencies.GBP);
  const [pickedToCurrency, setPickedToCurrency] = useState<Currencies>(Currencies.USD);

  const fetchRateData = async () => {
    setIsRateLoading(true);

    try {
      await Promise.all(
        Object.keys(Currencies).map((currency) =>
          axios.get(`https://api.exchangerate.host/latest`, {
            params: { base: currency, symbols: Object.keys(Currencies).join(',') },
          })
        )
      ).then((values) => {
        let result: RatesType | null = null;

        values.forEach((response: RateDataResponse) => {
          result = {
            ...result,
            [response.data.base]: response.data.rates,
          };
        });

        setRateData(result);
      });
    } catch {
      notification.error({
        message: 'Something went wrong..',
        description: 'Please, try again later',
      });
    } finally {
      setIsRateLoading(false);
    }
  };

  useEffect(() => {
    const fetchRateDataInterval = setInterval(() => {
      fetchRateData();
    }, 10000);

    return () => {
      clearInterval(fetchRateDataInterval);
    };
  }, []);

  const pickedFromCurrencyRate = rateData && rateData[pickedFromCurrency];
  const rate = pickedFromCurrencyRate && pickedFromCurrencyRate[pickedToCurrency];

  return (
    <StyledPageLayout>
      <GlobalStyles />
      <StyledHeader>
        <Row align="middle" justify="space-between">
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col>
            {isRateLoading && <Spin indicator={antIcon} />}
            {!isRateLoading && rateData && pickedFromCurrency !== pickedToCurrency && (
              <div>{`1 ${pickedFromCurrency} = ${Number(rate).toFixed(
                2
              )} ${pickedToCurrency}`}</div>
            )}
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              form="ExchangeCurrencies"
              disabled={pickedFromCurrency === pickedToCurrency}
            >
              Exchange
            </Button>
          </Col>
        </Row>
      </StyledHeader>
      <ExchangeCurrenciesForm
        bankAccount={bankAccount}
        setPickedFromCurrency={setPickedFromCurrency}
        setPickedToCurrency={setPickedToCurrency}
      />
    </StyledPageLayout>
  );
};
