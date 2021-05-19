import React, { FC } from 'react';
import { Form, Space } from 'antd';

import { AccountType, Currencies } from 'types';
import { parseDecimals } from 'utils';
import {
  StyledCarousel,
  StyledCarouselItem,
  StyledFormItem,
  StyledTitle,
  StyledInput,
} from './ExchangeCurrenciesForm.styled';
interface Props {
  onFormSubmit: (values: { from: string; to: string }) => void;
  bankAccount: AccountType;
  setPickedFromCurrency: (currency: Currencies) => void;
  setPickedToCurrency: (currency: Currencies) => void;
  rate?: number | null;
}

export const ExchangeCurrenciesForm: FC<Props> = ({
  onFormSubmit,
  bankAccount,
  setPickedFromCurrency,
  setPickedToCurrency,
  rate,
}) => {
  const [form] = Form.useForm();
  const inputFormatter = (value: number | string | undefined) => {
    if (!value) {
      return '';
    }

    const splittedValue = value.toString().split('.');
    if (splittedValue && splittedValue[1] && splittedValue[1].length > 2) {
      return parseDecimals(value);
    }

    return value.toString();
  };

  const onFinish = (values: { from: string; to: string }) => {
    onFormSubmit(values);

    form.resetFields();
  };

  return (
    <Form
      name="ExchangeCurrencies"
      form={form}
      onFinish={onFinish}
      initialValues={{
        from: 0,
        to: 0,
      }}
    >
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
                  <div>You have {parseDecimals(value)}</div>
                </div>
                <StyledFormItem name="from">
                  <StyledInput
                    bordered={false}
                    onChange={(value) => {
                      if (!rate) {
                        return;
                      }

                      form.setFieldsValue({ to: +value * rate });
                    }}
                    formatter={inputFormatter}
                  />
                </StyledFormItem>
              </Space>
            </StyledCarouselItem>
          </div>
        ))}
      </StyledCarousel>
      <StyledCarousel
        draggable
        initialSlide={2}
        afterChange={(current) =>
          setPickedToCurrency(Object.keys(Currencies)[current] as Currencies)
        }
      >
        {Object.entries(bankAccount).map(([currency, value]) => (
          <div key={currency}>
            <StyledCarouselItem>
              <Space size={40} wrap>
                <div>
                  <StyledTitle level={2}>{currency}</StyledTitle>
                  <div>You have {parseDecimals(value)}</div>
                </div>
                <StyledFormItem name="to">
                  <StyledInput
                    bordered={false}
                    onChange={(value) => {
                      if (!rate) {
                        return;
                      }

                      form.setFieldsValue({ from: +value / rate });
                    }}
                    formatter={inputFormatter}
                  />
                </StyledFormItem>
              </Space>
            </StyledCarouselItem>
          </div>
        ))}
      </StyledCarousel>
    </Form>
  );
};
