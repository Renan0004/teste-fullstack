import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<{ $variant: string; $fullWidth: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${props => props.$variant === 'primary' && `
    background-color: #FF8000;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background-color: #E67300;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    &:disabled {
      background-color: #A0A0A0;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background-color: transparent;
    color: #FF8000;
    border: 1px solid #FF8000;
    
    &:hover {
      background-color: rgba(255, 128, 0, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    &:disabled {
      border-color: #A0A0A0;
      color: #A0A0A0;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $fullWidth={fullWidth}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 