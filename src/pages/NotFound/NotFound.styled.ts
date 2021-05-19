import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: white;
  }
`;

export const StyledPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #096dd9;
`;
