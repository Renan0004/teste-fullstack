import React from 'react';
import styled from 'styled-components';
import { TimeRecordWithHours } from '../types';
import { Theme } from '../styles/themes';

interface TimeRecordCardProps {
  timeRecord: TimeRecordWithHours;
  userCode?: string;
}

const CardContainer = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const CardHeader = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DateText = styled.span<{ theme: Theme }>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const HoursInfo = styled.div<{ theme: Theme }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const TimeDetails = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeInfo = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
`;

const TimeLabel = styled.span<{ theme: Theme }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const TimeValue = styled.span<{ theme: Theme }>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const InProgressBadge = styled.span<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const UserCodeBadge = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const TimeRecordCard: React.FC<TimeRecordCardProps> = ({ timeRecord, userCode }) => {
  // Formata a data para exibição
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Formata o horário para exibição
  const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch (error) {
      return '';
    }
  };

  // Formata as horas trabalhadas
  const formatHours = (hours: number, minutes: number, seconds: number): string => {
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <CardContainer>
      {userCode && <UserCodeBadge>#{userCode}</UserCodeBadge>}
      <CardHeader>
        <DateText>{formatDate(timeRecord.entry_time)}</DateText>
        <HoursInfo>
          {formatHours(
            timeRecord.workedHours.hours, 
            timeRecord.workedHours.minutes,
            timeRecord.workedHours.seconds
          )}
        </HoursInfo>
      </CardHeader>
      <TimeDetails>
        <TimeInfo>
          <TimeLabel>Entrada:</TimeLabel>
          <TimeValue>{formatTime(timeRecord.entry_time)}</TimeValue>
        </TimeInfo>
        {timeRecord.exit_time ? (
          <TimeInfo>
            <TimeLabel>Saída:</TimeLabel>
            <TimeValue>{formatTime(timeRecord.exit_time)}</TimeValue>
          </TimeInfo>
        ) : (
          <InProgressBadge>Em andamento</InProgressBadge>
        )}
      </TimeDetails>
    </CardContainer>
  );
};

export default TimeRecordCard; 