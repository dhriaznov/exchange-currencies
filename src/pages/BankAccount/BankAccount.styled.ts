import { Carousel, Typography, Button } from 'antd';
import styled from 'styled-components';

import { ExchangeIcon } from 'assets';
import { colors } from 'ui';

const { Title } = Typography;

export const StyledCarousel = styled(Carousel)`
  height: 50vh;
  background-color: ${colors.blueHighContrast};
`;

export const StyledCarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 50vh;
  color: ${colors.white};
`;

export const StyledControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: ${colors.white};
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
      fill: ${colors.blueLight};
    }
  }

  :active {
    svg {
      fill: ${colors.blueHighContrast};
    }
  }
`;
