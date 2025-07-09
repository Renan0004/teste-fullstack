import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../styles/ThemeContext';
import ConfirmationModal from '../ConfirmationModal';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('ConfirmationModal Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Título do Modal',
    message: 'Mensagem de confirmação'
  };

  it('não renderiza nada quando isOpen é false', () => {
    renderWithTheme(
      <ConfirmationModal 
        {...mockProps}
        isOpen={false}
      />
    );
    
    expect(screen.queryByText('Título do Modal')).not.toBeInTheDocument();
  });

  it('renderiza o título e a mensagem corretamente', () => {
    renderWithTheme(<ConfirmationModal {...mockProps} />);
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Mensagem de confirmação')).toBeInTheDocument();
  });

  it('renderiza os botões de cancelar e confirmar', () => {
    renderWithTheme(<ConfirmationModal {...mockProps} />);
    
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('chama a função onClose quando o botão Cancelar é clicado', () => {
    renderWithTheme(<ConfirmationModal {...mockProps} />);
    
    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('chama as funções onConfirm e onClose quando o botão Confirmar é clicado', () => {
    renderWithTheme(<ConfirmationModal {...mockProps} />);
    
    fireEvent.click(screen.getByText('Confirmar'));
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('chama a função onClose quando clica fora do modal', () => {
    renderWithTheme(<ConfirmationModal {...mockProps} />);
    
    // Clica no overlay (fora do conteúdo do modal)
    const overlay = screen.getByText('Título do Modal').parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    }
  });
}); 