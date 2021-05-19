import { Carousel, Form, Typography, InputNumber } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const StyledCarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: calc(50vh - 26px);
  color: white;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

export const StyledCarousel = styled(Carousel)`
  height: calc(50vh - 26px);
  background-color: ${props => props?.theme?.lighter ? '#40a9ff' : '#096dd9'};
`;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: white;
  }
`;

export const StyledInput = styled(InputNumber)`
  width: 100%;
  max-width: 180px;
  background-color: transparent;
  color: white;
  font-size: 2.25rem;

  .ant-input-number-input {
    text-align: right;
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`;
