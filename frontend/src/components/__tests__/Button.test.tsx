import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renderiza o botão com o texto correto', () => {
    render(<Button>Teste</Button>);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('chama a função onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não chama a função onClick quando desabilitado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Clique</Button>);
    
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aplica a variante primária por padrão', () => {
    render(<Button>Primário</Button>);
    const button = screen.getByText('Primário');
    
    // Verifica se o estilo é aplicado (verificação básica)
    expect(button).toHaveStyle('background-color: #FF8000');
  });

  it('aplica a variante secundária quando especificada', () => {
    render(<Button variant="secondary">Secundário</Button>);
    const button = screen.getByText('Secundário');
    
    // Verifica se o estilo é aplicado (verificação básica)
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle('color: #FF8000');
  });

  it('aplica largura total quando fullWidth é true', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByText('Full Width');
    
    expect(button).toHaveStyle('width: 100%');
  });
}); 