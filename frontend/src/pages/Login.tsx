import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1E2733;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
    max-width: 100%;
  }
`;

const LoginCard = styled.div`
  background-color: #2C394B;
  border-radius: 8px;
  padding: 32px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 24px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #FFFFFF;
  margin-bottom: 32px;
  text-align: center;
  font-weight: 600;

  span {
    color: #FF8000;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 24px;
    margin-bottom: 24px;
  }
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
  font-size: 14px;
`;

const InfoMessage = styled.p`
  color: #A0A0A0;
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
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
    
    // Mostra notificação de boas-vindas
    toast.success(`Bem-vindo(a)! Código ${userCode} registrado com sucesso.`);
    
    // Redireciona para a página de dashboard
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <Header />
      <LoginContent>
        <LoginCard>
          <Title>
            Ponto <span>ilumeo</span>
          </Title>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Código do usuário"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Digite seu código"
            fullWidth
          />
            <InfoMessage>
              Digite qualquer código para acessar o sistema.
              <br />
              Não é necessário cadastro prévio.
            </InfoMessage>
            <ButtonWrapper>
              <Button type="submit" fullWidth>
            Confirmar
              </Button>
            </ButtonWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        </LoginCard>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login; 