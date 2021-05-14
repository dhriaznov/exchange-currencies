import React, { FC } from 'react';
import { Carousel, Form, Input, Space } from 'antd';

import { Currencies } from 'types';
import { StyledCarouselItem, StyledFormItem } from './ExchangeCurrenciesForm.styled';

interface Props {
  bankAccount: {
    [key in keyof typeof Currencies]: number
  }
}

export const ExchangeCurrenciesForm: FC<Props> = ({ bankAccount }) => (
  <Form name="ExchangeCurrencies" onFinish={values => console.log(values)}>
  <Carousel draggable initialSlide={1}>
    {Object.entries(bankAccount).map((item) => (
      <div key={item[0]}>
        <StyledCarouselItem>
          <Space size={40}>
            <div>
              <div>{item[0]}</div>
              <div>You have {item[1]}</div>
            </div>
            <StyledFormItem name="from">
              <Input />
            </StyledFormItem>
          </Space>
        </StyledCarouselItem>
      </div>
    ))}
  </Carousel>
  <Carousel draggable initialSlide={2}>
    {Object.entries(bankAccount).map((item) => (
      <div key={item[0]}>
        <StyledCarouselItem>
          <Space size={40}>
            <div>
              <div>{item[0]}</div>
              <div>You have {item[1]}</div>
            </div>
            <StyledFormItem name="from">
              <Input />
            </StyledFormItem>
          </Space>
        </StyledCarouselItem>
      </div>
    ))}
  </Carousel>
</Form>
);