import { TimeRecord } from '../models/TimeRecord';

/**
 * Interface para escrita de registros de ponto
 * Implementa o princípio da Segregação de Interface (ISP)
 */
export interface ITimeRecordWriter {
  createEntry(userId: string): Promise<TimeRecord>;
  registerExit(id: string): Promise<TimeRecord | null>;
} 