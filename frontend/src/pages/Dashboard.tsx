import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Button from '../components/Button';
import TimeRecordCard from '../components/TimeRecordCard';
import ExportButton from '../components/ExportButton';
import { timeRecordService } from '../services/api';
import { TimeRecord, TimeRecordWithHours, WorkedHours } from '../types';
import { Theme } from '../styles/themes';

const DashboardContainer = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  transition: all 0.3s ease;
`;

const DashboardContent = styled.div<{ theme: Theme }>`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const TimeSection = styled.section<{ theme: Theme }>`
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 24px;
    padding: 20px;
  }
`;

const TimeTitle = styled.h2<{ theme: Theme }>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimeDisplay = styled.div<{ theme: Theme }>`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const SubTitle = styled.p<{ theme: Theme }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
`;

const UserCodeBadge = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 20px;
    right: 20px;
    font-size: 12px;
    padding: 3px 10px;
  }
`;

const HistorySection = styled.section<{ theme: Theme }>`
  margin-top: 32px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 24px;
  }
`;

const HistoryTitle = styled.h3<{ theme: Theme }>`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
`;

const HistoryList = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
`;

const NoRecords = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 16px;
`;

const LoadingContainer = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`;

const ButtonContainer = styled.div<{ theme: Theme }>`
  margin-top: 24px;
`;

const HistoryHeader = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Dashboard: React.FC = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [currentRecord, setCurrentRecord] = useState<TimeRecord | null>(null);
  const [workedHours, setWorkedHours] = useState<WorkedHours>({ hours: 0, minutes: 0, seconds: 0 });
  const [previousRecords, setPreviousRecords] = useState<TimeRecordWithHours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Tempo decorrido em segundos
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Função para iniciar o cronômetro
  const startTimer = useCallback(() => {
    if (!isTimerRunning) {
      // Limpar qualquer timer existente antes de criar um novo
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setIsTimerRunning(true);
      
      // Iniciar o cronômetro que atualiza a cada segundo
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          
          // Calcular horas, minutos e segundos
          const hours = Math.floor(newTime / 3600);
          const minutes = Math.floor((newTime % 3600) / 60);
          const seconds = newTime % 60;
          
          // Atualizar o estado de workedHours
          setWorkedHours({ hours, minutes, seconds });
          
          return newTime;
        });
      }, 1000);
    }
  }, [isTimerRunning]);

  // Função para parar o cronômetro
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
  }, []);

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
      // Calcular o tempo decorrido desde a entrada
      const entryTime = new Date(currentRecord.entry_time).getTime();
      const now = Date.now();
      const initialElapsedSeconds = Math.floor((now - entryTime) / 1000);
      
      // Definir o tempo decorrido
      setElapsedTime(initialElapsedSeconds);
      
      // Iniciar o cronômetro
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentRecord, startTimer, stopTimer]);

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
            const now = Date.now();
            const initialElapsedSeconds = Math.floor((now - entryTime) / 1000);
            
            // Definir o tempo decorrido
            setElapsedTime(initialElapsedSeconds);
            
            // Calcular horas, minutos e segundos
            const hours = Math.floor(initialElapsedSeconds / 3600);
            const minutes = Math.floor((initialElapsedSeconds % 3600) / 60);
            const seconds = initialElapsedSeconds % 60;
            
            // Atualizar o estado de workedHours
            setWorkedHours({ hours, minutes, seconds });
          } else {
            setWorkedHours(currentData.workedHours);
          }
        } else {
          // Se não há registro, define horas zeradas
          setWorkedHours({ hours: 0, minutes: 0, seconds: 0 });
          setElapsedTime(0);
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
        
        // Resetar o cronômetro
        setElapsedTime(0);
        setWorkedHours({ hours: 0, minutes: 0, seconds: 0 });
        
        // Iniciar o cronômetro
        setIsTimerRunning(false); // Resetar para garantir que startTimer funcione
        setTimeout(() => startTimer(), 0);
        
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
          <UserCodeBadge># {userCode}</UserCodeBadge>
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
          <HistoryHeader>
            <HistoryTitle>Dias anteriores</HistoryTitle>
            {previousRecords.length > 0 && (
              <ExportButton 
                timeRecords={previousRecords} 
                userCode={userCode} 
              />
            )}
          </HistoryHeader>
          <HistoryList>
            {previousRecords.length > 0 ? (
              previousRecords.map((record) => (
                <TimeRecordCard key={record.id} timeRecord={record} userCode={userCode} />
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