import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${normalize}
 
  html, 
  body,
  #⚛ {
     height: 100%;
  }
`;
