import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/themes';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

// Interface para os props do styled component
interface StyledButtonProps {
  $fullWidth?: boolean;
  $variant?: 'primary' | 'secondary' | 'outline';
  $size?: 'small' | 'medium' | 'large';
  theme: Theme;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => 
    props.$size === 'small' ? '8px 16px' : 
    props.$size === 'large' ? '16px 32px' : 
    '12px 24px'
  };
  font-size: ${props => 
    props.$size === 'small' ? '14px' : 
    props.$size === 'large' ? '18px' : 
    '16px'
  };
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => {
    if (props.$variant === 'secondary') {
      return `
        background-color: ${props.theme.colors.secondary};
        color: ${props.theme.colors.text};
        border: none;
        
        &:hover {
          filter: brightness(1.1);
        }
        
        &:active {
          filter: brightness(0.9);
        }
      `;
    } else if (props.$variant === 'outline') {
      return `
        background-color: transparent;
        color: ${props.theme.colors.primary};
        border: 2px solid ${props.theme.colors.primary};
        
        &:hover {
          background-color: ${props.theme.colors.primary}20;
        }
        
        &:active {
          background-color: ${props.theme.colors.primary}40;
        }
      `;
    } else {
      return `
        background-color: ${props.theme.colors.primary};
        color: #FFFFFF;
        border: none;
        
        &:hover {
          filter: brightness(1.1);
        }
        
        &:active {
          filter: brightness(0.9);
        }
      `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(30%);
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  fullWidth = false, 
  variant = 'primary',
  size = 'medium',
  ...rest 
}) => {
  return (
    <StyledButton 
      $fullWidth={fullWidth} 
      $variant={variant}
      $size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 