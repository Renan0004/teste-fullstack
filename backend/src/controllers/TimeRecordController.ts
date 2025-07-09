import { Request, Response } from 'express';
import { TimeRecordService } from '../services/TimeRecordService';
import { ITimeRecordService } from '../interfaces/ITimeRecordService';

export class TimeRecordController {
  private timeRecordService: ITimeRecordService;

  constructor(timeRecordService: ITimeRecordService = new TimeRecordService()) {
    this.timeRecordService = timeRecordService;
  }

  /**
   * Obtém o registro de ponto atual do usuário
   */
  async getCurrentTimeRecord(req: Request, res: Response): Promise<Response> {
    try {
      const { userCode } = req.params;

      if (!userCode) {
        return res.status(400).json({ error: 'Código do usuário é obrigatório' });
      }

      const timeRecord = await this.timeRecordService.getCurrentTimeRecord(userCode);

      if (!timeRecord) {
        // Se não há registro, retorna um objeto vazio com horas zeradas
        return res.status(200).json({
          timeRecord: null,
          workedHours: { hours: 0, minutes: 0, seconds: 0 }
        });
      }

      const workedHours = this.timeRecordService.calculateWorkedHours(timeRecord);

      return res.status(200).json({
        timeRecord,
        workedHours
      });
    } catch (error) {
      console.error('Erro ao obter registro de ponto atual:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Obtém os registros de ponto anteriores do usuário
   */
  async getPreviousTimeRecords(req: Request, res: Response): Promise<Response> {
    try {
      const { userCode } = req.params;

      if (!userCode) {
        return res.status(400).json({ error: 'Código do usuário é obrigatório' });
      }

      const timeRecords = await this.timeRecordService.getPreviousTimeRecords(userCode);

      // Mesmo que não tenha registros, retorna um array vazio (não é erro)
      const recordsWithHours = timeRecords.map(record => ({
        ...record,
        workedHours: this.timeRecordService.calculateWorkedHours(record)
      }));

      return res.status(200).json(recordsWithHours);
    } catch (error) {
      console.error('Erro ao obter registros de ponto anteriores:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Registra a entrada do usuário
   */
  async registerEntry(req: Request, res: Response): Promise<Response> {
    try {
      const { userCode } = req.body;

      if (!userCode) {
        return res.status(400).json({ error: 'Código do usuário é obrigatório' });
      }

      const timeRecord = await this.timeRecordService.registerEntry(userCode);

      return res.status(201).json(timeRecord);
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * Registra a saída do usuário
   */
  async registerExit(req: Request, res: Response): Promise<Response> {
    try {
      const { userCode } = req.body;

      if (!userCode) {
        return res.status(400).json({ error: 'Código do usuário é obrigatório' });
      }

      const timeRecord = await this.timeRecordService.registerExit(userCode);

      if (!timeRecord) {
        return res.status(404).json({ error: 'Registro de ponto não encontrado ou já finalizado' });
      }

      const workedHours = this.timeRecordService.calculateWorkedHours(timeRecord);

      return res.status(200).json({
        timeRecord,
        workedHours
      });
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
} 