import React, { useEffect, useState, useRef } from 'react';
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px;
  }
`;

const TimeSection = styled.section`
  margin-bottom: 32px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 24px;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #A0A0A0;
  margin-bottom: 16px;
`;

const HistorySection = styled.section`
  margin-top: 32px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 24px;
  }
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
  const [workedHours, setWorkedHours] = useState<WorkedHours>({ hours: 0, minutes: 0, seconds: 0 });
  const [previousRecords, setPreviousRecords] = useState<TimeRecordWithHours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Efeito para inicializar os dados
  useEffect(() => {
    const storedUserCode = localStorage.getItem('@PontoIlumeo:userCode');
    
    if (!storedUserCode) {
      navigate('/');
      return;
    }
    
    setUserCode(storedUserCode);
    loadData(storedUserCode);
  }, [navigate]);

  // Efeito para gerenciar o cronômetro
  useEffect(() => {
    // Inicia o cronômetro se houver um registro atual sem hora de saída
    if (currentRecord && !currentRecord.exit_time) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentRecord]);

  // Efeito para atualizar o tempo trabalhado quando o cronômetro está rodando
  useEffect(() => {
    if (isTimerRunning) {
      const entryTime = currentRecord ? new Date(currentRecord.entry_time).getTime() : Date.now();
      const elapsedSeconds = Math.floor((Date.now() - entryTime) / 1000);
      
      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;
      
      setWorkedHours({ hours, minutes, seconds });
    }
  }, [timerSeconds, isTimerRunning, currentRecord]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
  };

  const loadData = async (code: string) => {
    setLoading(true);
    
    try {
      // Carrega o registro atual
      const currentData = await timeRecordService.getCurrentTimeRecord(code);
      if (currentData) {
        setCurrentRecord(currentData.timeRecord);
        
        // Se não tiver hora de saída, inicia o cronômetro
        if (!currentData.timeRecord.exit_time) {
          const entryTime = new Date(currentData.timeRecord.entry_time).getTime();
          const elapsedSeconds = Math.floor((Date.now() - entryTime) / 1000);
          
          const hours = Math.floor(elapsedSeconds / 3600);
          const minutes = Math.floor((elapsedSeconds % 3600) / 60);
          const seconds = elapsedSeconds % 60;
          
          setWorkedHours({ hours, minutes, seconds });
        } else {
          setWorkedHours(currentData.workedHours);
        }
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
      const response = await timeRecordService.registerEntry(userCode);
      if (response) {
        setCurrentRecord(response);
        startTimer();
      }
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
    }
  };

  const handleRegisterExit = async () => {
    try {
      const response = await timeRecordService.registerExit(userCode);
      if (response) {
        setCurrentRecord(response.timeRecord);
        setWorkedHours(response.workedHours);
        stopTimer();
      }
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
    }
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours}h ${minutes}m ${seconds}s`;
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
            {formatTime(workedHours.hours, workedHours.minutes, workedHours.seconds)}
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