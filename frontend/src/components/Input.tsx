import React from 'react';
import styled from 'styled-components';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  maxLength?: number;
  fullWidth?: boolean;
}

interface InputContainerProps {
  $fullWidth: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 8px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #3A4B5F;
  background-color: #1A2430;
  color: #FFFFFF;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) inset;
  
  &:focus {
    outline: none;
    border-color: #FF8000;
    box-shadow: 0 0 0 2px rgba(255, 128, 0, 0.2);
  }
  
  &:hover:not(:focus) {
    border-color: #4A5D76;
  }
  
  &::placeholder {
    color: #A0A0A0;
  }
`;

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  maxLength,
  fullWidth = false,
}) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </InputContainer>
  );
};

export default Input; 