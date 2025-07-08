import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock do useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('renderiza o logo corretamente', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Ponto')).toBeInTheDocument();
    expect(screen.getByText('ilumeo')).toBeInTheDocument();
  });

  it('não exibe o código do usuário quando não informado', () => {
    renderWithRouter(<Header />);
    
    const userInfo = screen.queryByText('#');
    expect(userInfo).not.toBeInTheDocument();
  });

  it('exibe o código do usuário quando informado', () => {
    renderWithRouter(<Header userCode="ABC123" />);
    
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('não exibe o botão de logout quando showLogout é false', () => {
    renderWithRouter(<Header userCode="ABC123" showLogout={false} />);
    
    const logoutButton = screen.queryByText('Sair');
    expect(logoutButton).not.toBeInTheDocument();
  });

  it('exibe o botão de logout quando showLogout é true', () => {
    renderWithRouter(<Header userCode="ABC123" showLogout={true} />);
    
    const logoutButton = screen.getByText('Sair');
    expect(logoutButton).toBeInTheDocument();
  });

  it('abre o modal de confirmação ao clicar no botão de logout', () => {
    renderWithRouter(<Header userCode="ABC123" showLogout={true} />);
    
    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);
    
    expect(screen.getByText('Confirmar saída')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja sair do sistema?')).toBeInTheDocument();
  });
}); 