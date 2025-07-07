import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import TimeRecordCard from '../components/TimeRecordCard';
import { timeRecordService } from '../services/api';
import { TimeRecord, TimeRecordWithHours, WorkedHours } from '../types';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const DashboardContent = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const TimeSection = styled.section`
  margin-bottom: 32px;
`;

const TimeTitle = styled.h2`
  font-size: 16px;
  color: #A0A0A0;
  margin-bottom: 8px;
`;

const TimeDisplay = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #A0A0A0;
  margin-bottom: 16px;
`;

const HistorySection = styled.section`
  margin-top: 32px;
`;

const HistoryTitle = styled.h3`
  font-size: 18px;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoRecords = styled.p`
  color: #A0A0A0;
  text-align: center;
  margin-top: 16px;
`;

export const Dashboard: React.FC = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [currentRecord, setCurrentRecord] = useState<TimeRecord | null>(null);
  const [workedHours, setWorkedHours] = useState<WorkedHours>({ hours: 0, minutes: 0 });
  const [previousRecords, setPreviousRecords] = useState<TimeRecordWithHours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserCode = localStorage.getItem('@PontoIlumeo:userCode');
    
    if (!storedUserCode) {
      navigate('/');
      return;
    }
    
    setUserCode(storedUserCode);
    loadData(storedUserCode);
  }, [navigate]);

  const loadData = async (code: string) => {
    setLoading(true);
    
    try {
      // Carrega o registro atual
      const currentData = await timeRecordService.getCurrentTimeRecord(code);
      if (currentData) {
        setCurrentRecord(currentData.timeRecord);
        setWorkedHours(currentData.workedHours);
      }
      
      // Carrega os registros anteriores
      const previousData = await timeRecordService.getPreviousTimeRecords(code);
      setPreviousRecords(previousData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterEntry = async () => {
    try {
      await timeRecordService.registerEntry(userCode);
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
    }
  };

  const handleRegisterExit = async () => {
    try {
      await timeRecordService.registerExit(userCode);
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
    }
  };

  const formatTime = (hours: number, minutes: number) => {
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardContainer>
      <Header userCode={userCode} />
      <DashboardContent>
        <TimeSection>
          <TimeTitle>Relógio de ponto</TimeTitle>
          <TimeDisplay>
            {formatTime(workedHours.hours, workedHours.minutes)}
          </TimeDisplay>
          <SubTitle>Horas de hoje</SubTitle>
          
          {!currentRecord || currentRecord.exit_time ? (
            <Button onClick={handleRegisterEntry} fullWidth>
              Hora de entrada
            </Button>
          ) : (
            <Button onClick={handleRegisterExit} fullWidth>
              Hora de saída
            </Button>
          )}
        </TimeSection>
        
        <HistorySection>
          <HistoryTitle>Dias anteriores</HistoryTitle>
          <HistoryList>
            {previousRecords.length > 0 ? (
              previousRecords.map((record) => (
                <TimeRecordCard key={record.id} timeRecord={record} />
              ))
            ) : (
              <NoRecords>Nenhum registro encontrado</NoRecords>
            )}
          </HistoryList>
        </HistorySection>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 