import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/globalStyles';
import TimeRecordCard from '../TimeRecordCard';
import { TimeRecordWithHours } from '../../types';

describe('TimeRecordCard Component', () => {
  const mockTimeRecord: TimeRecordWithHours = {
    id: '1',
    entry_time: '2023-07-10T08:00:00.000Z',
    exit_time: '2023-07-10T17:00:00.000Z',
    total_minutes: 540,
    total_seconds: 0,
    created_at: '2023-07-10T08:00:00.000Z',
    user_id: '1',
    workedHours: {
      hours: 9,
      minutes: 0,
      seconds: 0
    }
  };

  const renderWithTheme = (component: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('renderiza o card com a data formatada corretamente', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    expect(screen.getByText('10/07/2023')).toBeInTheDocument();
  });

  it('renderiza o card com as horas trabalhadas formatadas corretamente', () => {
    renderWithTheme(<TimeRecordCard timeRecord={mockTimeRecord} />);
    expect(screen.getByText('9h 0m 0s')).toBeInTheDocument();
  });

  it('lida corretamente com diferentes formatos de horas trabalhadas', () => {
    const record = {
      ...mockTimeRecord,
      workedHours: {
        hours: 5,
        minutes: 30,
        seconds: 15
      }
    };
    
    renderWithTheme(<TimeRecordCard timeRecord={record} />);
    expect(screen.getByText('5h 30m 15s')).toBeInTheDocument();
  });

  it('lida corretamente com datas inválidas', () => {
    const record = {
      ...mockTimeRecord,
      entry_time: 'invalid-date'
    };
    
    renderWithTheme(<TimeRecordCard timeRecord={record} />);
    // Deve exibir a string original quando a data é inválida
    expect(screen.getByText('invalid-date')).toBeInTheDocument();
  });
}); 