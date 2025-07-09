import { ITimeRecordReader } from './ITimeRecordReader';
import { ITimeRecordWriter } from './ITimeRecordWriter';

/**
 * Interface completa para repositório de registros de ponto
 * Estende interfaces específicas seguindo o princípio da Segregação de Interface (ISP)
 */
export interface ITimeRecordRepository extends ITimeRecordReader, ITimeRecordWriter {
  // Métodos adicionais específicos do repositório podem ser adicionados aqui
} 