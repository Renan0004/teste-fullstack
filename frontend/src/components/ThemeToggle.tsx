import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../styles/ThemeContext';

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Alternar tema">
      {theme === 'dark' ? '☀️' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle; 