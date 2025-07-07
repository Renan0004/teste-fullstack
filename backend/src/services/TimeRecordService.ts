import { TimeRecordRepository } from '../repositories/TimeRecordRepository';
import { UserRepository } from '../repositories/UserRepository';
import { TimeRecord } from '../models/TimeRecord';

export class TimeRecordService {
  /**
   * Obtém o registro de ponto atual do usuário
   */
  async getCurrentTimeRecord(userCode: string): Promise<TimeRecord | null> {
    const user = await UserRepository.findByCode(userCode);
    
    if (!user) {
      return null;
    }
    
    return TimeRecordRepository.findCurrentDayRecord(user.id);
  }
  
  /**
   * Obtém os registros de ponto anteriores do usuário
   */
  async getPreviousTimeRecords(userCode: string): Promise<TimeRecord[]> {
    const user = await UserRepository.findByCode(userCode);
    
    if (!user) {
      return [];
    }
    
    return TimeRecordRepository.findPreviousRecords(user.id);
  }
  
  /**
   * Registra a entrada do usuário
   */
  async registerEntry(userCode: string): Promise<TimeRecord | null> {
    const user = await UserRepository.createIfNotExists(userCode);
    
    // Verifica se já existe um registro aberto para hoje
    const existingRecord = await TimeRecordRepository.findCurrentDayRecord(user.id);
    
    if (existingRecord && !existingRecord.exit_time) {
      return existingRecord; // Já existe um registro de entrada sem saída
    }
    
    return TimeRecordRepository.createEntry(user.id);
  }
  
  /**
   * Registra a saída do usuário
   */
  async registerExit(userCode: string): Promise<TimeRecord | null> {
    const user = await UserRepository.findByCode(userCode);
    
    if (!user) {
      return null;
    }
    
    const currentRecord = await TimeRecordRepository.findCurrentDayRecord(user.id);
    
    if (!currentRecord || currentRecord.exit_time) {
      return null; // Não há registro aberto ou já foi fechado
    }
    
    return TimeRecordRepository.registerExit(currentRecord.id);
  }
  
  /**
   * Calcula o total de horas trabalhadas em um registro
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