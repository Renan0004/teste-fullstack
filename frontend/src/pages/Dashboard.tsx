import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Button from '../components/Button';
import TimeRecordCard from '../components/TimeRecordCard';
import { timeRecordService } from '../services/api';
import { TimeRecord, TimeRecordWithHours, WorkedHours } from '../types';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1E2733;
`;

const DashboardContent = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const TimeSection = styled.section`
  margin-bottom: 32px;
  background-color: #2C394B;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 24px;
    padding: 20px;
  }
`;

const TimeTitle = styled.h2`
  font-size: 16px;
  color: #A0A0A0;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimeDisplay = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #A0A0A0;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 3px solid #FF8000;
  display: flex;
  align-items: center;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #FFFFFF;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
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
        // Se timeRecord for null, apenas define como null e usa as horas zeradas
        setCurrentRecord(currentData.timeRecord);
        
        if (currentData.timeRecord) {
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
        } else {
          // Se não há registro, define horas zeradas
          setWorkedHours({ hours: 0, minutes: 0, seconds: 0 });
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
        toast.success('Entrada registrada com sucesso!');
      }
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
      toast.error('Erro ao registrar entrada. Tente novamente.');
    }
  };

  const handleRegisterExit = async () => {
    try {
      const response = await timeRecordService.registerExit(userCode);
      if (response) {
        setCurrentRecord(response.timeRecord);
        setWorkedHours(response.workedHours);
        stopTimer();
        toast.success('Saída registrada com sucesso!');
      }
      loadData(userCode);
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      toast.error('Erro ao registrar saída. Tente novamente.');
    }
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <LoadingContainer>
        Carregando...
      </LoadingContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header userCode={userCode} showLogout={true} />
      <DashboardContent>
        <TimeSection>
          <TimeTitle>Relógio de ponto</TimeTitle>
          <TimeDisplay>
            {formatTime(workedHours.hours, workedHours.minutes, workedHours.seconds)}
          </TimeDisplay>
          <SubTitle>Horas de hoje</SubTitle>
          
          <ButtonContainer>
            {!currentRecord || currentRecord.exit_time ? (
              <Button onClick={handleRegisterEntry} fullWidth>
                Hora de entrada
              </Button>
            ) : (
              <Button onClick={handleRegisterExit} fullWidth>
                Hora de saída
              </Button>
            )}
          </ButtonContainer>
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