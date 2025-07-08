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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1E2733;
  }

  ::-webkit-scrollbar-thumb {
    background: #2C394B;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #374B63;
  }
`;

export const theme = {
  colors: {
    background: '#1E2733',
    backgroundSecondary: '#2C394B',
    backgroundCard: '#1A2430',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    primary: '#FF8000',
    primaryHover: '#E67300',
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
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  }
}; 