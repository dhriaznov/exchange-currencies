import React from 'react';
import { Link } from 'react-router-dom';

import { StyledCarousel, StyledControlsWrapper } from './BankAccount.styled';

export const BankAccount = () => {
  return (
    <>
      <StyledCarousel></StyledCarousel>
      <StyledControlsWrapper>
        <Link to="/exchange-currencies">Exchange</Link>
      </StyledControlsWrapper>
    </>
  );
};
