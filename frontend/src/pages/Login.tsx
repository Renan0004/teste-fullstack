import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #FFFFFF;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  color: #F44336;
  margin-top: 16px;
  text-align: center;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  background-color: #FF8000;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #E67300;
  }
  
  &:disabled {
    background-color: #A0A0A0;
    cursor: not-allowed;
  }
`;

export const Login: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userCode.trim()) {
      setError('Por favor, informe o código do usuário');
      return;
    }
    
    // Armazena o código do usuário no localStorage
    localStorage.setItem('@PontoIlumeo:userCode', userCode);
    
    // Redireciona para a página de dashboard
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <Header />
      <LoginContent>
        <Title>Ponto ilumeo</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Código do usuário"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Digite seu código"
            fullWidth
          />
          <SubmitButton type="submit">
            Confirmar
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login; 