import React, { FC } from 'react';
import { Form, Space } from 'antd';

import { AccountType, Currencies } from 'types';
import {
  StyledCarousel,
  StyledCarouselItem,
  StyledFormItem,
  StyledTitle,
  StyledInput,
} from './ExchangeCurrenciesForm.styled';
interface Props {
  bankAccount: AccountType;
  setPickedFromCurrency: (currency: Currencies) => void;
  setPickedToCurrency: (currency: Currencies) => void;
}

export const ExchangeCurrenciesForm: FC<Props> = ({
  bankAccount,
  setPickedFromCurrency,
  setPickedToCurrency,
}) => (
  <Form name="ExchangeCurrencies" onFinish={(values) => console.log(values)}>
    <StyledCarousel
      draggable
      initialSlide={1}
      theme={{ lighter: true }}
      afterChange={(current) =>
        setPickedFromCurrency(Object.keys(Currencies)[current] as Currencies)
      }
    >
      {Object.entries(bankAccount).map(([currency, value]) => (
        <div key={currency}>
          <StyledCarouselItem>
            <Space size={40} wrap>
              <div>
                <StyledTitle level={2}>{currency}</StyledTitle>
                <div>You have {value}</div>
              </div>
              <StyledFormItem name="from">
                <StyledInput defaultValue={0} bordered={false} />
              </StyledFormItem>
            </Space>
          </StyledCarouselItem>
        </div>
      ))}
    </StyledCarousel>
    <StyledCarousel
      draggable
      initialSlide={2}
      afterChange={(current) => setPickedToCurrency(Object.keys(Currencies)[current] as Currencies)}
    >
      {Object.entries(bankAccount).map(([currency, value]) => (
        <div key={currency}>
          <StyledCarouselItem>
            <Space size={40} wrap>
              <div>
                <StyledTitle level={2}>{currency}</StyledTitle>
                <div>You have {value}</div>
              </div>
              <StyledFormItem name="to">
                <StyledInput defaultValue={0} bordered={false} />
              </StyledFormItem>
            </Space>
          </StyledCarouselItem>
        </div>
      ))}
    </StyledCarousel>
  </Form>
);
