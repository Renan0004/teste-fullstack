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
`;

const StyledInput = styled.input`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #2C394B;
  background-color: #1E2733;
  color: #FFFFFF;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #FF8000;
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