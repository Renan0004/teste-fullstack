import React from 'react';
import styled from 'styled-components';
import { TimeRecordWithHours } from '../types';

interface TimeRecordCardProps {
  timeRecord: TimeRecordWithHours;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #2C394B;
  border-radius: 4px;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px;
  }
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateText = styled.span`
  font-size: 14px;
  color: #FFFFFF;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const HoursInfo = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;

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

  // Formata as horas trabalhadas
  const formatHours = (hours: number, minutes: number, seconds: number): string => {
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <CardContainer>
      <DateInfo>
        <DateText>{formatDate(timeRecord.entry_time)}</DateText>
      </DateInfo>
      <HoursInfo>
        {formatHours(
          timeRecord.workedHours.hours, 
          timeRecord.workedHours.minutes,
          timeRecord.workedHours.seconds
        )}
      </HoursInfo>
    </CardContainer>
  );
};

export default TimeRecordCard; 