import { TimeRecord } from '../models/TimeRecord';
import { ITimeRecordRepository } from '../interfaces/ITimeRecordRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TimeRecordRepository } from '../repositories/TimeRecordRepository';
import { UserRepository } from '../repositories/UserRepository';
import { BaseTimeRecordService } from './BaseTimeRecordService';

/**
 * Implementação concreta do serviço de registro de ponto
 * Estende a classe base e implementa os métodos abstratos
 */
export class TimeRecordService extends BaseTimeRecordService {
  constructor(
    timeRecordRepository: ITimeRecordRepository = TimeRecordRepository,
    userRepository: IUserRepository = UserRepository
  ) {
    super(timeRecordRepository, userRepository);
  }

  /**
   * Registra a entrada do usuário
   * Implementação concreta do método abstrato
   */
  async registerEntry(userCode: string): Promise<TimeRecord | null> {
    const user = await this.userRepository.createIfNotExists(userCode);
    
    // Verifica se já existe um registro aberto para hoje
    const existingRecord = await this.timeRecordRepository.findCurrentDayRecord(user.id);
    
    if (existingRecord && !existingRecord.exit_time) {
      return existingRecord; // Já existe um registro de entrada sem saída
    }
    
    return this.timeRecordRepository.createEntry(user.id);
  }
  
  /**
   * Registra a saída do usuário
   * Implementação concreta do método abstrato
   */
  async registerExit(userCode: string): Promise<TimeRecord | null> {
    const user = await this.userRepository.createIfNotExists(userCode);
    
    const currentRecord = await this.timeRecordRepository.findCurrentDayRecord(user.id);
    
    if (!currentRecord || currentRecord.exit_time) {
      return null; // Não há registro aberto ou já foi fechado
    }
    
    return this.timeRecordRepository.registerExit(currentRecord.id);
  }
} 