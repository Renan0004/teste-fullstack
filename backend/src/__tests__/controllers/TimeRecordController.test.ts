import { TimeRecordController } from '../../controllers/TimeRecordController';
import { TimeRecordService } from '../../services/TimeRecordService';
import { Request, Response } from 'express';
import { TimeRecord } from '../../models/TimeRecord';

// Mock do serviço
jest.mock('../../services/TimeRecordService');

describe('TimeRecordController', () => {
  let timeRecordController: TimeRecordController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockTimeRecordService: jest.Mocked<TimeRecordService>;

  const mockTimeRecord: TimeRecord = {
    id: '1',
    entry_time: new Date(),
    user_id: '1',
    created_at: new Date(),
  };

  const mockTimeRecordWithExit: TimeRecord = {
    ...mockTimeRecord,
    exit_time: new Date(),
    total_minutes: 60,
  };

  const mockWorkedHours = { hours: 1, minutes: 0 };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock do serviço
    mockTimeRecordService = {
      getCurrentTimeRecord: jest.fn(),
      getPreviousTimeRecords: jest.fn(),
      registerEntry: jest.fn(),
      registerExit: jest.fn(),
      calculateWorkedHours: jest.fn(),
    } as unknown as jest.Mocked<TimeRecordService>;
    
    // Mock do construtor
    (TimeRecordService as jest.Mock).mockImplementation(() => mockTimeRecordService);
    
    // Inicializa o controlador
    timeRecordController = new TimeRecordController();
    
    // Mock da request e response
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getCurrentTimeRecord', () => {
    it('deve retornar erro 400 quando não informar o código do usuário', async () => {
      mockRequest.params = {};
      
      await timeRecordController.getCurrentTimeRecord(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
    });
    
    it('deve retornar erro 404 quando não encontrar o registro', async () => {
      mockRequest.params = { userCode: 'ABC123' };
      mockTimeRecordService.getCurrentTimeRecord.mockResolvedValue(null);
      
      await timeRecordController.getCurrentTimeRecord(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.getCurrentTimeRecord).toHaveBeenCalledWith('ABC123');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Registro de ponto não encontrado' });
    });
    
    it('deve retornar o registro quando encontrado', async () => {
      mockRequest.params = { userCode: 'ABC123' };
      mockTimeRecordService.getCurrentTimeRecord.mockResolvedValue(mockTimeRecord);
      mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
      
      await timeRecordController.getCurrentTimeRecord(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.getCurrentTimeRecord).toHaveBeenCalledWith('ABC123');
      expect(mockTimeRecordService.calculateWorkedHours).toHaveBeenCalledWith(mockTimeRecord);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        timeRecord: mockTimeRecord,
        workedHours: mockWorkedHours
      });
    });
    
    it('deve retornar erro 500 quando ocorrer um erro interno', async () => {
      mockRequest.params = { userCode: 'ABC123' };
      mockTimeRecordService.getCurrentTimeRecord.mockRejectedValue(new Error('Erro interno'));
      
      await timeRecordController.getCurrentTimeRecord(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
    });
  });

  describe('getPreviousTimeRecords', () => {
    it('deve retornar erro 400 quando não informar o código do usuário', async () => {
      mockRequest.params = {};
      
      await timeRecordController.getPreviousTimeRecords(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
    });
    
    it('deve retornar os registros anteriores', async () => {
      mockRequest.params = { userCode: 'ABC123' };
      mockTimeRecordService.getPreviousTimeRecords.mockResolvedValue([mockTimeRecordWithExit]);
      mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
      
      await timeRecordController.getPreviousTimeRecords(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.getPreviousTimeRecords).toHaveBeenCalledWith('ABC123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        {
          ...mockTimeRecordWithExit,
          workedHours: mockWorkedHours
        }
      ]);
    });
    
    it('deve retornar erro 500 quando ocorrer um erro interno', async () => {
      mockRequest.params = { userCode: 'ABC123' };
      mockTimeRecordService.getPreviousTimeRecords.mockRejectedValue(new Error('Erro interno'));
      
      await timeRecordController.getPreviousTimeRecords(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
    });
  });

  describe('registerEntry', () => {
    it('deve retornar erro 400 quando não informar o código do usuário', async () => {
      mockRequest.body = {};
      
      await timeRecordController.registerEntry(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
    });
    
    it('deve registrar a entrada com sucesso', async () => {
      mockRequest.body = { userCode: 'ABC123' };
      mockTimeRecordService.registerEntry.mockResolvedValue(mockTimeRecord);
      
      await timeRecordController.registerEntry(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.registerEntry).toHaveBeenCalledWith('ABC123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTimeRecord);
    });
    
    it('deve retornar erro 500 quando ocorrer um erro interno', async () => {
      mockRequest.body = { userCode: 'ABC123' };
      mockTimeRecordService.registerEntry.mockRejectedValue(new Error('Erro interno'));
      
      await timeRecordController.registerEntry(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
    });
  });

  describe('registerExit', () => {
    it('deve retornar erro 400 quando não informar o código do usuário', async () => {
      mockRequest.body = {};
      
      await timeRecordController.registerExit(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
    });
    
    it('deve retornar erro 404 quando não encontrar o registro', async () => {
      mockRequest.body = { userCode: 'ABC123' };
      mockTimeRecordService.registerExit.mockResolvedValue(null);
      
      await timeRecordController.registerExit(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.registerExit).toHaveBeenCalledWith('ABC123');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Registro de ponto não encontrado ou já finalizado' });
    });
    
    it('deve registrar a saída com sucesso', async () => {
      mockRequest.body = { userCode: 'ABC123' };
      mockTimeRecordService.registerExit.mockResolvedValue(mockTimeRecordWithExit);
      mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
      
      await timeRecordController.registerExit(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockTimeRecordService.registerExit).toHaveBeenCalledWith('ABC123');
      expect(mockTimeRecordService.calculateWorkedHours).toHaveBeenCalledWith(mockTimeRecordWithExit);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        timeRecord: mockTimeRecordWithExit,
        workedHours: mockWorkedHours
      });
    });
    
    it('deve retornar erro 500 quando ocorrer um erro interno', async () => {
      mockRequest.body = { userCode: 'ABC123' };
      mockTimeRecordService.registerExit.mockRejectedValue(new Error('Erro interno'));
      
      await timeRecordController.registerExit(
        mockRequest as Request,
        mockResponse as Response
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
    });
  });
}); 