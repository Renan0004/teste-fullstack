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
const TimeRecordController_1 = require("../../controllers/TimeRecordController");
const TimeRecordService_1 = require("../../services/TimeRecordService");
// Mock do serviço
jest.mock('../../services/TimeRecordService');
describe('TimeRecordController', () => {
    let timeRecordController;
    let mockRequest;
    let mockResponse;
    let mockTimeRecordService;
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
    const mockWorkedHours = { hours: 1, minutes: 0, seconds: 0 };
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
        };
        // Mock do construtor
        TimeRecordService_1.TimeRecordService.mockImplementation(() => mockTimeRecordService);
        // Inicializa o controlador
        timeRecordController = new TimeRecordController_1.TimeRecordController();
        // Mock da request e response
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('getCurrentTimeRecord', () => {
        it('deve retornar erro 400 quando não informar o código do usuário', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = {};
            yield timeRecordController.getCurrentTimeRecord(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
        }));
        it('deve retornar erro 404 quando não encontrar o registro', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { userCode: 'ABC123' };
            mockTimeRecordService.getCurrentTimeRecord.mockResolvedValue(null);
            yield timeRecordController.getCurrentTimeRecord(mockRequest, mockResponse);
            expect(mockTimeRecordService.getCurrentTimeRecord).toHaveBeenCalledWith('ABC123');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Registro de ponto não encontrado' });
        }));
        it('deve retornar o registro quando encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { userCode: 'ABC123' };
            mockTimeRecordService.getCurrentTimeRecord.mockResolvedValue(mockTimeRecord);
            mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
            yield timeRecordController.getCurrentTimeRecord(mockRequest, mockResponse);
            expect(mockTimeRecordService.getCurrentTimeRecord).toHaveBeenCalledWith('ABC123');
            expect(mockTimeRecordService.calculateWorkedHours).toHaveBeenCalledWith(mockTimeRecord);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                timeRecord: mockTimeRecord,
                workedHours: mockWorkedHours
            });
        }));
        it('deve retornar erro 500 quando ocorrer um erro interno', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { userCode: 'ABC123' };
            mockTimeRecordService.getCurrentTimeRecord.mockRejectedValue(new Error('Erro interno'));
            yield timeRecordController.getCurrentTimeRecord(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
        }));
    });
    describe('getPreviousTimeRecords', () => {
        it('deve retornar erro 400 quando não informar o código do usuário', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = {};
            yield timeRecordController.getPreviousTimeRecords(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
        }));
        it('deve retornar os registros anteriores', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { userCode: 'ABC123' };
            mockTimeRecordService.getPreviousTimeRecords.mockResolvedValue([mockTimeRecordWithExit]);
            mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
            yield timeRecordController.getPreviousTimeRecords(mockRequest, mockResponse);
            expect(mockTimeRecordService.getPreviousTimeRecords).toHaveBeenCalledWith('ABC123');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith([
                Object.assign(Object.assign({}, mockTimeRecordWithExit), { workedHours: mockWorkedHours })
            ]);
        }));
        it('deve retornar erro 500 quando ocorrer um erro interno', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { userCode: 'ABC123' };
            mockTimeRecordService.getPreviousTimeRecords.mockRejectedValue(new Error('Erro interno'));
            yield timeRecordController.getPreviousTimeRecords(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
        }));
    });
    describe('registerEntry', () => {
        it('deve retornar erro 400 quando não informar o código do usuário', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {};
            yield timeRecordController.registerEntry(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
        }));
        it('deve registrar a entrada com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = { userCode: 'ABC123' };
            mockTimeRecordService.registerEntry.mockResolvedValue(mockTimeRecord);
            yield timeRecordController.registerEntry(mockRequest, mockResponse);
            expect(mockTimeRecordService.registerEntry).toHaveBeenCalledWith('ABC123');
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTimeRecord);
        }));
        it('deve retornar erro 500 quando ocorrer um erro interno', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = { userCode: 'ABC123' };
            mockTimeRecordService.registerEntry.mockRejectedValue(new Error('Erro interno'));
            yield timeRecordController.registerEntry(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
        }));
    });
    describe('registerExit', () => {
        it('deve retornar erro 400 quando não informar o código do usuário', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {};
            yield timeRecordController.registerExit(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Código do usuário é obrigatório' });
        }));
        it('deve retornar erro 404 quando não encontrar o registro', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = { userCode: 'ABC123' };
            mockTimeRecordService.registerExit.mockResolvedValue(null);
            yield timeRecordController.registerExit(mockRequest, mockResponse);
            expect(mockTimeRecordService.registerExit).toHaveBeenCalledWith('ABC123');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Registro de ponto não encontrado ou já finalizado' });
        }));
        it('deve registrar a saída com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = { userCode: 'ABC123' };
            mockTimeRecordService.registerExit.mockResolvedValue(mockTimeRecordWithExit);
            mockTimeRecordService.calculateWorkedHours.mockReturnValue(mockWorkedHours);
            yield timeRecordController.registerExit(mockRequest, mockResponse);
            expect(mockTimeRecordService.registerExit).toHaveBeenCalledWith('ABC123');
            expect(mockTimeRecordService.calculateWorkedHours).toHaveBeenCalledWith(mockTimeRecordWithExit);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                timeRecord: mockTimeRecordWithExit,
                workedHours: mockWorkedHours
            });
        }));
        it('deve retornar erro 500 quando ocorrer um erro interno', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = { userCode: 'ABC123' };
            mockTimeRecordService.registerExit.mockRejectedValue(new Error('Erro interno'));
            yield timeRecordController.registerExit(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
        }));
    });
});
