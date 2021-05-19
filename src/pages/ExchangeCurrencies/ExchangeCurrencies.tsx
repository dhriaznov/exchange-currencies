import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, notification } from 'antd';
import axios from 'axios';

import { Currencies, CurrenciesType, RatesType } from 'types';
import { parseDecimals, forms } from 'utils';
import { ExchangeCurrenciesForm, Loader } from 'components';
import { BankAccountContext } from '../../App';
import { StyledHeader } from '../../App/App.styled';

const { REACT_APP_API_URL } = process.env;

interface RateDataResponse {
  data: {
    base: keyof CurrenciesType;
    rates: RatesType;
  };
}

export const ExchangeCurrencies = () => {
  const history = useHistory();
  const { bankAccount, setBankAccount } = useContext(BankAccountContext);
  const [isRateLoading, setIsRateLoading] = useState<boolean>(false);
  const [isExchangeLoading, setIsExchangeLoading] = useState<boolean>(false);
  const [rateData, setRateData] = useState<RatesType | null>(null);
  const [pickedFromCurrency, setPickedFromCurrency] = useState<Currencies>(Currencies.GBP);
  const [pickedToCurrency, setPickedToCurrency] = useState<Currencies>(Currencies.USD);
  const pickedFromCurrencyRate = rateData && rateData[pickedFromCurrency];
  const rate = pickedFromCurrencyRate && pickedFromCurrencyRate[pickedToCurrency];
  const isSameCurrencyPicked = pickedFromCurrency === pickedToCurrency;

  const ratesInfoRow = !isRateLoading && !isSameCurrencyPicked && rate && (
    <div>{`1 ${pickedFromCurrency} = ${parseDecimals(rate)} ${pickedToCurrency}`}</div>
  );

  const fetchRateData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchRateData();

    const fetchRateDataInterval = setInterval(() => {
      fetchRateData();
    }, 10000);

    return () => {
      clearInterval(fetchRateDataInterval);
    };
  }, [fetchRateData]);

  const onFormSubmit = useCallback(
    (values: { from: string; to: string }) => {
      setIsExchangeLoading(true);

      axios
        .get(`${REACT_APP_API_URL}convert`, {
          params: { from: pickedFromCurrency, to: pickedToCurrency, amount: values.from },
        })
        .then(({ data }) => {
          setBankAccount({
            ...bankAccount,
            [pickedFromCurrency]: bankAccount[pickedFromCurrency] - data.query.amount,
            [pickedToCurrency]: bankAccount[pickedToCurrency] + data.result,
          });
        })
        .catch(() => {
          notification.error({
            message: `Couldn't process your conversion`,
            description: 'Please, try again later',
          });
        })
        .finally(() => {
          setIsExchangeLoading(false);

          history.push('/');
        });
    },
    [bankAccount, history, pickedFromCurrency, pickedToCurrency, setBankAccount]
  );

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
            {ratesInfoRow}
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              form={forms.ExchangeCurrencies}
              loading={isExchangeLoading}
              disabled={isExchangeLoading || isSameCurrencyPicked}
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
