import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  userCode?: string;
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

export const Header: React.FC<HeaderProps> = ({ userCode }) => {
  return (
    <HeaderContainer>
      <Logo>
        Ponto <span>ilumeo</span>
      </Logo>
      {userCode && (
        <UserInfo>
          <span>#</span>
          <strong>{userCode}</strong>
        </UserInfo>
      )}
    </HeaderContainer>
  );
};

export default Header; 