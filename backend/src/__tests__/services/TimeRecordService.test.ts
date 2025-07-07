import { TimeRecordService } from '../../services/TimeRecordService';
import { UserRepository } from '../../repositories/UserRepository';
import { TimeRecordRepository } from '../../repositories/TimeRecordRepository';
import { User } from '../../models/User';
import { TimeRecord } from '../../models/TimeRecord';

// Mock dos repositórios
jest.mock('../../repositories/UserRepository', () => ({
  UserRepository: {
    findByCode: jest.fn(),
    createIfNotExists: jest.fn(),
  },
}));

jest.mock('../../repositories/TimeRecordRepository', () => ({
  TimeRecordRepository: {
    findCurrentDayRecord: jest.fn(),
    findPreviousRecords: jest.fn(),
    createEntry: jest.fn(),
    registerExit: jest.fn(),
  },
}));

describe('TimeRecordService', () => {
  let timeRecordService: TimeRecordService;
  const mockUser: User = {
    id: '1',
    code: 'ABC123',
    name: 'Usuário Teste',
    timeRecords: [],
  };

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

  beforeEach(() => {
    timeRecordService = new TimeRecordService();
    jest.clearAllMocks();
  });

  describe('getCurrentTimeRecord', () => {
    it('deve retornar null quando o usuário não for encontrado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(null);

      const result = await timeRecordService.getCurrentTimeRecord('ABC123');
      expect(result).toBeNull();
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
    });

    it('deve retornar o registro atual quando o usuário for encontrado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(mockTimeRecord);

      const result = await timeRecordService.getCurrentTimeRecord('ABC123');
      expect(result).toEqual(mockTimeRecord);
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getPreviousTimeRecords', () => {
    it('deve retornar array vazio quando o usuário não for encontrado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(null);

      const result = await timeRecordService.getPreviousTimeRecords('ABC123');
      expect(result).toEqual([]);
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
    });

    it('deve retornar os registros anteriores quando o usuário for encontrado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findPreviousRecords as jest.Mock).mockResolvedValue([mockTimeRecordWithExit]);

      const result = await timeRecordService.getPreviousTimeRecords('ABC123');
      expect(result).toEqual([mockTimeRecordWithExit]);
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findPreviousRecords).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('registerEntry', () => {
    it('deve criar um novo registro quando não existir um registro aberto', async () => {
      (UserRepository.createIfNotExists as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(null);
      (TimeRecordRepository.createEntry as jest.Mock).mockResolvedValue(mockTimeRecord);

      const result = await timeRecordService.registerEntry('ABC123');
      expect(result).toEqual(mockTimeRecord);
      expect(UserRepository.createIfNotExists).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
      expect(TimeRecordRepository.createEntry).toHaveBeenCalledWith(mockUser.id);
    });

    it('deve retornar o registro existente quando já existir um registro aberto', async () => {
      (UserRepository.createIfNotExists as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(mockTimeRecord);

      const result = await timeRecordService.registerEntry('ABC123');
      expect(result).toEqual(mockTimeRecord);
      expect(UserRepository.createIfNotExists).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
      expect(TimeRecordRepository.createEntry).not.toHaveBeenCalled();
    });
  });

  describe('registerExit', () => {
    it('deve retornar null quando o usuário não for encontrado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(null);

      const result = await timeRecordService.registerExit('ABC123');
      expect(result).toBeNull();
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
    });

    it('deve retornar null quando não existir um registro aberto', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(null);

      const result = await timeRecordService.registerExit('ABC123');
      expect(result).toBeNull();
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
    });

    it('deve retornar null quando o registro já estiver fechado', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(mockTimeRecordWithExit);

      const result = await timeRecordService.registerExit('ABC123');
      expect(result).toBeNull();
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
    });

    it('deve registrar a saída quando existir um registro aberto', async () => {
      (UserRepository.findByCode as jest.Mock).mockResolvedValue(mockUser);
      (TimeRecordRepository.findCurrentDayRecord as jest.Mock).mockResolvedValue(mockTimeRecord);
      (TimeRecordRepository.registerExit as jest.Mock).mockResolvedValue(mockTimeRecordWithExit);

      const result = await timeRecordService.registerExit('ABC123');
      expect(result).toEqual(mockTimeRecordWithExit);
      expect(UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
      expect(TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
      expect(TimeRecordRepository.registerExit).toHaveBeenCalledWith(mockTimeRecord.id);
    });
  });

  describe('calculateWorkedHours', () => {
    it('deve retornar zeros quando não houver total_minutes', () => {
      const result = timeRecordService.calculateWorkedHours(mockTimeRecord);
      expect(result).toEqual({ hours: 0, minutes: 0 });
    });

    it('deve calcular corretamente as horas e minutos', () => {
      const result = timeRecordService.calculateWorkedHours(mockTimeRecordWithExit);
      expect(result).toEqual({ hours: 1, minutes: 0 });
    });

    it('deve calcular corretamente horas e minutos para valores maiores', () => {
      const record = { ...mockTimeRecordWithExit, total_minutes: 185 }; // 3h 5min
      const result = timeRecordService.calculateWorkedHours(record);
      expect(result).toEqual({ hours: 3, minutes: 5 });
    });
  });
}); 