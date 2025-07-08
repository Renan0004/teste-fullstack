import React from 'react';
import styled from 'styled-components';
import { TimeRecordWithHours } from '../types';

interface TimeRecordCardProps {
  timeRecord: TimeRecordWithHours;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #1A2430;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const HoursInfo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const TimeDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TimeLabel = styled.span`
  font-size: 14px;
  color: #A0A0A0;
  margin-right: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const TimeValue = styled.span`
  font-size: 16px;
  color: #FFFFFF;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

export const TimeRecordCard: React.FC<TimeRecordCardProps> = ({ timeRecord }) => {
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
        {timeRecord.exit_time && (
          <TimeInfo>
            <TimeLabel>Saída:</TimeLabel>
            <TimeValue>{formatTime(timeRecord.exit_time)}</TimeValue>
          </TimeInfo>
        )}
      </TimeDetails>
    </CardContainer>
  );
};

export default TimeRecordCard; 