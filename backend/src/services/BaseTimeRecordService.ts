import { TimeRecord } from '../models/TimeRecord';
import { ITimeRecordRepository } from '../interfaces/ITimeRecordRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { ITimeRecordService } from '../interfaces/ITimeRecordService';

/**
 * Classe base abstrata para serviços de registro de ponto
 * Implementa o princípio Aberto-Fechado (OCP) permitindo extensão sem modificação
 */
export abstract class BaseTimeRecordService implements ITimeRecordService {
  protected timeRecordRepository: ITimeRecordRepository;
  protected userRepository: IUserRepository;

  constructor(
    timeRecordRepository: ITimeRecordRepository,
    userRepository: IUserRepository
  ) {
    this.timeRecordRepository = timeRecordRepository;
    this.userRepository = userRepository;
  }

  /**
   * Obtém o registro de ponto atual do usuário
   */
  async getCurrentTimeRecord(userCode: string): Promise<TimeRecord | null> {
    const user = await this.userRepository.createIfNotExists(userCode);
    return this.timeRecordRepository.findCurrentDayRecord(user.id);
  }
  
  /**
   * Obtém os registros de ponto anteriores do usuário
   */
  async getPreviousTimeRecords(userCode: string): Promise<TimeRecord[]> {
    const user = await this.userRepository.createIfNotExists(userCode);
    return this.timeRecordRepository.findPreviousRecords(user.id);
  }
  
  /**
   * Registra a entrada do usuário
   * Método que pode ser sobrescrito por classes derivadas
   */
  abstract registerEntry(userCode: string): Promise<TimeRecord | null>;
  
  /**
   * Registra a saída do usuário
   * Método que pode ser sobrescrito por classes derivadas
   */
  abstract registerExit(userCode: string): Promise<TimeRecord | null>;
  
  /**
   * Calcula o total de horas trabalhadas em um registro
   * Método que pode ser sobrescrito por classes derivadas para diferentes cálculos
   */
  calculateWorkedHours(timeRecord: TimeRecord): { hours: number; minutes: number; seconds: number } {
    if (!timeRecord.total_minutes) {
      return { hours: 0, minutes: 0, seconds: timeRecord.total_seconds || 0 };
    }
    
    const hours = Math.floor(timeRecord.total_minutes / 60);
    const minutes = timeRecord.total_minutes % 60;
    const seconds = timeRecord.total_seconds || 0;
    
    return { hours, minutes, seconds };
  }
} 