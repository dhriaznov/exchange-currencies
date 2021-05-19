import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

import { parseDecimals } from 'utils';
import { BankAccountContext } from '../../App';
import {
  StyledCarousel,
  StyledCarouselItem,
  StyledControlsWrapper,
  StyledTitle,
  StyledExchangeIcon,
  StyledButton,
} from './BankAccount.styled';

export const BankAccount = () => {
  const { bankAccount } = useContext(BankAccountContext);

  return (
    <>
      <StyledCarousel draggable initialSlide={1}>
        {Object.entries(bankAccount).map(([currency, value]) => (
          <div key={currency}>
            <StyledCarouselItem>
              <Space size={10}>
                <StyledTitle level={2}>{parseDecimals(value)}</StyledTitle>
                <div>{currency}</div>
              </Space>
            </StyledCarouselItem>
          </div>
        ))}
      </StyledCarousel>
      <StyledControlsWrapper>
        <Link to="/exchange-currencies">
          <StyledButton>
            <StyledExchangeIcon />
            Exchange
          </StyledButton>
        </Link>
      </StyledControlsWrapper>
    </>
  );
};
