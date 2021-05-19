import React, { useEffect, useState } from 'react';
import { Button, Row, Col, notification } from 'antd';
import axios from 'axios';

import { Currencies, CurrenciesType, AccountType, RatesType } from 'types';
import { parseDecimals } from 'utils';
import { ExchangeCurrenciesForm, Loader } from 'components';
import { StyledHeader } from '../../App/App.styled';
import { Link } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

let bankAccount: AccountType = {
  [Currencies.EUR]: 144.46,
  [Currencies.GBP]: 98.22,
  [Currencies.USD]: 78.34,
};

interface RateDataResponse {
  data: {
    base: keyof CurrenciesType;
    rates: RatesType;
  };
}

export const ExchangeCurrencies = () => {
  const [isRateLoading, setIsRateLoading] = useState<boolean>(false);
  const [isExchangeLoading, setIsExchangeLoading] = useState<boolean>(false);
  const [rateData, setRateData] = useState<RatesType | null>(null);
  const [pickedFromCurrency, setPickedFromCurrency] = useState<Currencies>(Currencies.GBP);
  const [pickedToCurrency, setPickedToCurrency] = useState<Currencies>(Currencies.USD);
  const pickedFromCurrencyRate = rateData && rateData[pickedFromCurrency];
  const rate = pickedFromCurrencyRate && pickedFromCurrencyRate[pickedToCurrency];
  const isSameCurrencyPicked = pickedFromCurrency === pickedToCurrency;

  const fetchRateData = async () => {
    setIsRateLoading(true);

    try {
      await Promise.all(
        Object.keys(Currencies).map((currency) =>
          axios.get(`${REACT_APP_API_URL}latest`, {
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
    fetchRateData();

    const fetchRateDataInterval = setInterval(() => {
      fetchRateData();
    }, 10000);

    return () => {
      clearInterval(fetchRateDataInterval);
    };
  }, []);

  const onFormSubmit = (values: { from: string; to: string }) => {
    setIsExchangeLoading(true);

    axios
      .get(`${REACT_APP_API_URL}convert`, {
        params: { from: pickedFromCurrency, to: pickedToCurrency, amount: values.from },
      })
      .then(({ data }) => {
        bankAccount = {
          ...bankAccount,
          [pickedFromCurrency]: bankAccount[pickedFromCurrency] - data.query.amount,
          [pickedToCurrency]: bankAccount[pickedToCurrency] + data.result,
        };
      })
      .catch(() => {
        notification.error({
          message: `Couldn't process your conversion`,
          description: 'Please, try again later',
        });
      })
      .finally(() => {
        setIsExchangeLoading(false);
      });
  };

  return (
    <>
      <StyledHeader>
        <Row align="middle" justify="space-between">
          <Col>
            <Link to="/">
              <Button>Cancel</Button>
            </Link>
          </Col>
          <Col>
            {isRateLoading && !isSameCurrencyPicked && <Loader />}
            {!isRateLoading && !isSameCurrencyPicked && rate && (
              <div>{`1 ${pickedFromCurrency} = ${parseDecimals(rate)} ${pickedToCurrency}`}</div>
            )}
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              form="ExchangeCurrencies"
              loading={isExchangeLoading}
              disabled={isExchangeLoading || pickedFromCurrency === pickedToCurrency}
            >
              Exchange
            </Button>
          </Col>
        </Row>
      </StyledHeader>
      <ExchangeCurrenciesForm
        onFormSubmit={onFormSubmit}
        bankAccount={bankAccount}
        setPickedFromCurrency={setPickedFromCurrency}
        setPickedToCurrency={setPickedToCurrency}
        rate={rate}
      />
    </>
  );
};
