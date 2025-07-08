import { DefaultTheme } from 'styled-components';

// Definição de tipos para o tema
export interface Theme extends DefaultTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
}

// Tema escuro (padrão)
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#FF8000',
    secondary: '#2C394B',
    background: '#1E2733',
    cardBackground: '#2C394B',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#3F4E5F',
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1200px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },
  fonts: {
    regular: 'Roboto, sans-serif',
    bold: 'Roboto-Bold, sans-serif',
  },
};

// Tema claro
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#FF8000',
    secondary: '#E8EDF2',
    background: '#F5F7FA',
    cardBackground: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#DDDDDD',
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1200px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    regular: 'Roboto, sans-serif',
    bold: 'Roboto-Bold, sans-serif',
  },
}; 