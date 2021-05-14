import React, { FC } from 'react';
import { Form, Input, Space, Typography } from 'antd';

import { Currencies } from 'types';
import { StyledCarousel, StyledCarouselItem, StyledFormItem } from './ExchangeCurrenciesForm.styled';

const { Title } = Typography;

interface Props {
  bankAccount: {
    [key in keyof typeof Currencies]: number
  }
}

export const ExchangeCurrenciesForm: FC<Props> = ({ bankAccount }) => (
  <Form name="ExchangeCurrencies" onFinish={values => console.log(values)}>
    <StyledCarousel draggable initialSlide={1} theme={{ lighter: true }}>
      {Object.entries(bankAccount).map(([currency, value]) => (
        <div key={currency}>
          <StyledCarouselItem>
            <Space size={40} wrap>
              <div>
                <Title level={2}>{currency}</Title>
                <div>You have {value}</div>
              </div>
              <StyledFormItem name="from">
                <Input />
              </StyledFormItem>
            </Space>
          </StyledCarouselItem>
        </div>
      ))}
    </StyledCarousel>
    <StyledCarousel draggable initialSlide={2}>
      {Object.entries(bankAccount).map(([currency, value]) => (
        <div key={currency}>
          <StyledCarouselItem>
            <Space size={40} wrap>
              <div>
                <Title level={2}>{currency}</Title>
                <div>You have {value}</div>
              </div>
              <StyledFormItem name="from">
                <Input />
              </StyledFormItem>
            </Space>
          </StyledCarouselItem>
        </div>
      ))}
    </StyledCarousel>
  </Form>
);