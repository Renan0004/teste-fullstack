import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';
import ThemeToggle from './ThemeToggle';
import { Theme } from '../styles/themes';

interface HeaderProps {
  userCode?: string;
  showLogout?: boolean;
}

const HeaderContainer = styled.header<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
    padding: 12px 16px;
  }
`;

const Logo = styled.div<{ theme: Theme }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 4px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const RightSection = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-right: 8px;
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const LogoutButton = styled.button<{ theme: Theme }>`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}20`};
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
          <ThemeToggle />
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