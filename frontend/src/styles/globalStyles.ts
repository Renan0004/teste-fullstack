import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #1E2733;
    color: #FFFFFF;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const theme = {
  colors: {
    background: '#1E2733',
    text: '#FFFFFF',
    primary: '#FF8000',
    secondary: '#2C394B',
    success: '#4CAF50',
    error: '#F44336',
  },
  fonts: {
    regular: 'Inter, sans-serif',
    bold: 'Inter-Bold, sans-serif',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  }
}; 