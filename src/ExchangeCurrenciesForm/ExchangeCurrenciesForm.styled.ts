import { Carousel, Form } from 'antd';
import styled from 'styled-components';

export const StyledCarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: calc(50vh - 26px);
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

export const StyledCarousel = styled(Carousel)`
  height: calc(50vh - 26px);
  background-color: ${props => props?.theme?.lighter ? '#40a9ff' : '#096dd9'};
`;
