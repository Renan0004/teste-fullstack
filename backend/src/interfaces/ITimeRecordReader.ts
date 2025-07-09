import { TimeRecord } from '../models/TimeRecord';

/**
 * Interface para leitura de registros de ponto
 * Implementa o princípio da Segregação de Interface (ISP)
 */
export interface ITimeRecordReader {
  findCurrentDayRecord(userId: string): Promise<TimeRecord | null>;
  findPreviousRecords(userId: string, limit?: number): Promise<TimeRecord[]>;
} 