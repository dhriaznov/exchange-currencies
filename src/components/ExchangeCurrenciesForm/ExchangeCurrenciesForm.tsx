import React, { FC, useCallback, useEffect } from 'react';
import { Form, Space } from 'antd';

import { AccountType, Currencies } from 'types';
import { parseDecimals, inputFormatter, forms } from 'utils';
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

  const onFinish = useCallback(
    (values: { from: string; to: string }) => {
      onFormSubmit(values);

      form.resetFields();
    },
    [form, onFormSubmit]
  );

  useEffect(() => {
    if (!rate) {
      return;
    }

    form.setFieldsValue({ to: +form.getFieldValue('from') * rate });
  }, [form, rate]);

  const initialFormValues = {
    from: 0,
    to: 0,
  };

  return (
    <Form
      name={forms.ExchangeCurrencies}
      form={form}
      onFinish={onFinish}
      initialValues={initialFormValues}
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
                    type="number"
                    bordered={false}
                    onChange={(value) => {
                      if (!rate) {
                        return;
                      }

                      form.setFieldsValue({ to: +value * rate });
                    }}
                    formatter={inputFormatter}
                    parser={inputFormatter}
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
                    type="number"
                    bordered={false}
                    onChange={(value) => {
                      if (!rate) {
                        return;
                      }

                      form.setFieldsValue({ from: +value / rate });
                    }}
                    formatter={inputFormatter}
                    parser={inputFormatter}
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
