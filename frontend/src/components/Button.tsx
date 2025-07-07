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
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => props.$variant === 'primary' && `
    background-color: #FF8000;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background-color: #E67300;
    }
    
    &:disabled {
      background-color: #A0A0A0;
      cursor: not-allowed;
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background-color: transparent;
    color: #FF8000;
    border: 1px solid #FF8000;
    
    &:hover {
      background-color: rgba(255, 128, 0, 0.1);
    }
    
    &:disabled {
      border-color: #A0A0A0;
      color: #A0A0A0;
      cursor: not-allowed;
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