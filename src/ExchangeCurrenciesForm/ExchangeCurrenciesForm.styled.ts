import { Form } from 'antd';
import styled from 'styled-components';

export const StyledCarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 160px;
  color: #fff;
  lineHeight: 160px;
  textAlign: center;
  background-color: #364d79;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;