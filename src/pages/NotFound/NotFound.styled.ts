import styled from 'styled-components';
import { Typography } from 'antd';

import { colors } from 'ui';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  &.ant-typography {
    color: ${colors.white};
  }
`;

export const StyledPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.blueHighContrast};
`;
