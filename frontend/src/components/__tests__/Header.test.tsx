import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  it('renderiza o logo corretamente', () => {
    render(<Header />);
    
    expect(screen.getByText('Ponto')).toBeInTheDocument();
    expect(screen.getByText('ilumeo')).toBeInTheDocument();
  });

  it('não exibe o código do usuário quando não informado', () => {
    render(<Header />);
    
    const userInfo = screen.queryByText('#');
    expect(userInfo).not.toBeInTheDocument();
  });

  it('exibe o código do usuário quando informado', () => {
    render(<Header userCode="ABC123" />);
    
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });
}); 