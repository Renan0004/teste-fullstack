"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TimeRecordService_1 = require("../../services/TimeRecordService");
const UserRepository_1 = require("../../repositories/UserRepository");
const TimeRecordRepository_1 = require("../../repositories/TimeRecordRepository");
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
    let timeRecordService;
    const mockUser = {
        id: '1',
        code: 'ABC123',
        name: 'Usuário Teste',
        timeRecords: [],
    };
    const mockTimeRecord = {
        id: '1',
        entry_time: new Date(),
        user_id: '1',
        created_at: new Date(),
        exit_time: null,
        total_minutes: null,
        total_seconds: null,
        user: null
    };
    const mockTimeRecordWithExit = Object.assign(Object.assign({}, mockTimeRecord), { exit_time: new Date(), total_minutes: 60, total_seconds: 0 });
    beforeEach(() => {
        timeRecordService = new TimeRecordService_1.TimeRecordService();
        jest.clearAllMocks();
    });
    describe('getCurrentTimeRecord', () => {
        it('deve retornar null quando o usuário não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(null);
            const result = yield timeRecordService.getCurrentTimeRecord('ABC123');
            expect(result).toBeNull();
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
        }));
        it('deve retornar o registro atual quando o usuário for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(mockTimeRecord);
            const result = yield timeRecordService.getCurrentTimeRecord('ABC123');
            expect(result).toEqual(mockTimeRecord);
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
        }));
    });
    describe('getPreviousTimeRecords', () => {
        it('deve retornar array vazio quando o usuário não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(null);
            const result = yield timeRecordService.getPreviousTimeRecords('ABC123');
            expect(result).toEqual([]);
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
        }));
        it('deve retornar os registros anteriores quando o usuário for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findPreviousRecords.mockResolvedValue([mockTimeRecordWithExit]);
            const result = yield timeRecordService.getPreviousTimeRecords('ABC123');
            expect(result).toEqual([mockTimeRecordWithExit]);
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findPreviousRecords).toHaveBeenCalledWith(mockUser.id);
        }));
    });
    describe('registerEntry', () => {
        it('deve criar um novo registro quando não existir um registro aberto', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.createIfNotExists.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(null);
            TimeRecordRepository_1.TimeRecordRepository.createEntry.mockResolvedValue(mockTimeRecord);
            const result = yield timeRecordService.registerEntry('ABC123');
            expect(result).toEqual(mockTimeRecord);
            expect(UserRepository_1.UserRepository.createIfNotExists).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
            expect(TimeRecordRepository_1.TimeRecordRepository.createEntry).toHaveBeenCalledWith(mockUser.id);
        }));
        it('deve retornar o registro existente quando já existir um registro aberto', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.createIfNotExists.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(mockTimeRecord);
            const result = yield timeRecordService.registerEntry('ABC123');
            expect(result).toEqual(mockTimeRecord);
            expect(UserRepository_1.UserRepository.createIfNotExists).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
            expect(TimeRecordRepository_1.TimeRecordRepository.createEntry).not.toHaveBeenCalled();
        }));
    });
    describe('registerExit', () => {
        it('deve retornar null quando o usuário não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(null);
            const result = yield timeRecordService.registerExit('ABC123');
            expect(result).toBeNull();
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
        }));
        it('deve retornar null quando não existir um registro aberto', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(null);
            const result = yield timeRecordService.registerExit('ABC123');
            expect(result).toBeNull();
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
        }));
        it('deve retornar null quando o registro já estiver fechado', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(mockTimeRecordWithExit);
            const result = yield timeRecordService.registerExit('ABC123');
            expect(result).toBeNull();
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
        }));
        it('deve registrar a saída quando existir um registro aberto', () => __awaiter(void 0, void 0, void 0, function* () {
            UserRepository_1.UserRepository.findByCode.mockResolvedValue(mockUser);
            TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord.mockResolvedValue(mockTimeRecord);
            TimeRecordRepository_1.TimeRecordRepository.registerExit.mockResolvedValue(mockTimeRecordWithExit);
            const result = yield timeRecordService.registerExit('ABC123');
            expect(result).toEqual(mockTimeRecordWithExit);
            expect(UserRepository_1.UserRepository.findByCode).toHaveBeenCalledWith('ABC123');
            expect(TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord).toHaveBeenCalledWith(mockUser.id);
            expect(TimeRecordRepository_1.TimeRecordRepository.registerExit).toHaveBeenCalledWith(mockTimeRecord.id);
        }));
    });
    describe('calculateWorkedHours', () => {
        it('deve retornar zeros quando não houver total_minutes', () => {
            const result = timeRecordService.calculateWorkedHours(mockTimeRecord);
            expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
        });
        it('deve calcular corretamente as horas e minutos', () => {
            const result = timeRecordService.calculateWorkedHours(mockTimeRecordWithExit);
            expect(result).toEqual({ hours: 1, minutes: 0, seconds: 0 });
        });
        it('deve calcular corretamente horas e minutos para valores maiores', () => {
            const record = Object.assign(Object.assign({}, mockTimeRecordWithExit), { total_minutes: 185, total_seconds: 30 }); // 3h 5min 30s
            const result = timeRecordService.calculateWorkedHours(record);
            expect(result).toEqual({ hours: 3, minutes: 5, seconds: 30 });
        });
    });
});
