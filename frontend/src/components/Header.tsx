import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

interface HeaderProps {
  userCode?: string;
  showLogout?: boolean;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #1E2733;
  border-bottom: 1px solid #2C394B;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
    padding: 12px 16px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  
  span {
    color: #FF8000;
    margin-left: 4px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: #2C394B;
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  span {
    color: #A0A0A0;
    margin-right: 8px;
  }
  
  strong {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #FF8000;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 128, 0, 0.1);
  }
`;

export const Header: React.FC<HeaderProps> = ({ userCode, showLogout = false }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('@PontoIlumeo:userCode');
    toast.info('Sessão encerrada com sucesso');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Logo>
        Ponto <span>ilumeo</span>
      </Logo>
      {userCode && (
        <RightSection>
          <UserInfo>
            <span>#</span>
            <strong>{userCode}</strong>
          </UserInfo>
          {showLogout && (
            <LogoutButton onClick={handleLogoutClick}>
              Sair
            </LogoutButton>
          )}
        </RightSection>
      )}

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirmar saída"
        message="Tem certeza que deseja sair do sistema?"
      />
    </HeaderContainer>
  );
};

export default Header; 