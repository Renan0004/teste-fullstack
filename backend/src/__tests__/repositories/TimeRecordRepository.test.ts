import { TimeRecordRepository } from '../../repositories/TimeRecordRepository';
import { AppDataSource } from '../../config/database';
import { TimeRecord } from '../../models/TimeRecord';
import { User } from '../../models/User';

// Mock do TypeORM
jest.mock('../../config/database', () => {
  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  };

  return {
    AppDataSource: {
      getRepository: jest.fn().mockReturnValue(mockRepository)
    }
  };
});

describe('TimeRecordRepository', () => {
  const mockRepository = AppDataSource.getRepository(TimeRecord) as jest.Mocked<any>;
  const userId = '123e4567-e89b-12d3-a456-426614174000';
  const timeRecordId = '123e4567-e89b-12d3-a456-426614174001';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findCurrentDayRecord', () => {
    it('should return the current day record', async () => {
      // Arrange
      const mockTimeRecord = {
        id: timeRecordId,
        user_id: userId,
        entry_time: new Date(),
        exit_time: null
      };
      mockRepository.findOne.mockResolvedValue(mockTimeRecord);

      // Act
      const result = await TimeRecordRepository.findCurrentDayRecord(userId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTimeRecord);
    });

    it('should return null when no record is found', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);

      // Act
      const result = await TimeRecordRepository.findCurrentDayRecord(userId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('findPreviousRecords', () => {
    it('should return previous records with default limit', async () => {
      // Arrange
      const mockTimeRecords = [
        { id: '1', user_id: userId, entry_time: new Date() },
        { id: '2', user_id: userId, entry_time: new Date() }
      ];
      mockRepository.find.mockResolvedValue(mockTimeRecords);

      // Act
      const result = await TimeRecordRepository.findPreviousRecords(userId);

      // Assert
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockTimeRecords);
    });

    it('should return previous records with custom limit', async () => {
      // Arrange
      const mockTimeRecords = [
        { id: '1', user_id: userId, entry_time: new Date() }
      ];
      mockRepository.find.mockResolvedValue(mockTimeRecords);

      // Act
      const result = await TimeRecordRepository.findPreviousRecords(userId, 1);

      // Assert
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find.mock.calls[0][0].take).toBe(1);
      expect(result).toEqual(mockTimeRecords);
    });
  });

  describe('createEntry', () => {
    it('should create a new time record entry', async () => {
      // Arrange
      const mockTimeRecord = {
        id: timeRecordId,
        user_id: userId,
        entry_time: new Date()
      };
      mockRepository.create.mockReturnValue(mockTimeRecord);
      mockRepository.save.mockResolvedValue(mockTimeRecord);

      // Act
      const result = await TimeRecordRepository.createEntry(userId);

      // Assert
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(mockTimeRecord);
      expect(result).toEqual(mockTimeRecord);
    });
  });

  describe('registerExit', () => {
    it('should register exit time for an existing record', async () => {
      // Arrange
      const entryTime = new Date(2023, 5, 1, 9, 0, 0);
      const mockTimeRecord = {
        id: timeRecordId,
        user_id: userId,
        entry_time: entryTime,
        exit_time: null
      };
      mockRepository.findOne.mockResolvedValue(mockTimeRecord);
      
      const updatedRecord = {
        ...mockTimeRecord,
        exit_time: new Date(),
        total_minutes: 60,
        total_seconds: 30
      };
      mockRepository.save.mockResolvedValue(updatedRecord);

      // Act
      const result = await TimeRecordRepository.registerExit(timeRecordId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: timeRecordId } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedRecord);
    });

    it('should return null if record is not found', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);

      // Act
      const result = await TimeRecordRepository.registerExit(timeRecordId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: timeRecordId } });
      expect(result).toBeNull();
    });

    it('should return null if record already has exit time', async () => {
      // Arrange
      const mockTimeRecord = {
        id: timeRecordId,
        user_id: userId,
        entry_time: new Date(),
        exit_time: new Date()
      };
      mockRepository.findOne.mockResolvedValue(mockTimeRecord);

      // Act
      const result = await TimeRecordRepository.registerExit(timeRecordId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: timeRecordId } });
      expect(result).toBeNull();
    });
  });
}); 