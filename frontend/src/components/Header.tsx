import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  userCode?: string;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1E2733;
  border-bottom: 1px solid #2C394B;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  
  span {
    color: #FF8000;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  
  span {
    color: #A0A0A0;
    margin-right: 8px;
  }
  
  strong {
    color: #FFFFFF;
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