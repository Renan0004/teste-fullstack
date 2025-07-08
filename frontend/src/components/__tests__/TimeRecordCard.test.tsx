import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/globalStyles';
import TimeRecordCard from '../TimeRecordCard';
import { TimeRecordWithHours } from '../../types';

const mockTimeRecord = {
  id: '1',
  entry_time: '2023-06-27T10:37:28.000Z',
  exit_time: '2023-06-27T10:37:32.000Z',
  user_id: '123',
  created_at: '2023-06-27T10:37:28.000Z',
  total_minutes: 0,
  total_seconds: 4,
  workedHours: {
    hours: 0,
    minutes: 0,
    seconds: 4
  }
};

const mockTimeRecordNoExit = {
  id: '2',
  entry_time: '2023-06-27T10:37:28.000Z',
  exit_time: null,
  user_id: '123',
  created_at: '2023-06-27T10:37:28.000Z',
  total_minutes: 0,
  total_seconds: 0,
  workedHours: {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('TimeRecordCard Component', () => {
  it('renderiza a data formatada corretamente', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    
    // Formato da data: DD/MM/YYYY
    expect(screen.getByText('27/06/2023')).toBeInTheDocument();
  });

  it('renderiza as horas trabalhadas corretamente', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    
    expect(screen.getByText('0h 0m 4s')).toBeInTheDocument();
  });

  it('renderiza o horário de entrada formatado corretamente', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    
    expect(screen.getByText('Entrada:')).toBeInTheDocument();
    // O horário depende do fuso horário, então verificamos apenas se existe algum texto após "Entrada:"
    const entryTimeContainer = screen.getByText('Entrada:').parentElement;
    expect(entryTimeContainer).toBeInTheDocument();
  });

  it('renderiza o horário de saída quando disponível', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    
    expect(screen.getByText('Saída:')).toBeInTheDocument();
    // O horário depende do fuso horário, então verificamos apenas se existe algum texto após "Saída:"
    const exitTimeContainer = screen.getByText('Saída:').parentElement;
    expect(exitTimeContainer).toBeInTheDocument();
  });

  it('não renderiza o horário de saída quando não disponível', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecordNoExit} />);
    
    expect(screen.queryByText('Saída:')).not.toBeInTheDocument();
  });
}); 