import { Carousel, Typography, Button } from 'antd';
import styled from 'styled-components';

import { ExchangeIcon } from 'assets';

const { Title } = Typography;

export const StyledCarousel = styled(Carousel)`
  height: 50vh;
  background-color: #096dd9;
`;

export const StyledCarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 50vh;
  color: white;
`;

export const StyledControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: white;
  }
`;

export const StyledExchangeIcon = styled(ExchangeIcon)`
  width: 14px;
  height: 14px;
  transition: inherit;
  margin-right: 5px;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  :hover,
  :focus {
    svg {
      fill: #40a9ff;
    }
  }

  :active {
    svg {
      fill: #096dd9;
    }
  }
`;
