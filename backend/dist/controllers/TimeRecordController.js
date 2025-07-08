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
exports.TimeRecordController = void 0;
const TimeRecordService_1 = require("../services/TimeRecordService");
class TimeRecordController {
    constructor() {
        this.timeRecordService = new TimeRecordService_1.TimeRecordService();
    }
    /**
     * Obtém o registro de ponto atual do usuário
     */
    getCurrentTimeRecord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userCode } = req.params;
                if (!userCode) {
                    return res.status(400).json({ error: 'Código do usuário é obrigatório' });
                }
                const timeRecord = yield this.timeRecordService.getCurrentTimeRecord(userCode);
                if (!timeRecord) {
                    return res.status(404).json({ error: 'Registro de ponto não encontrado' });
                }
                const workedHours = this.timeRecordService.calculateWorkedHours(timeRecord);
                return res.status(200).json({
                    timeRecord,
                    workedHours
                });
            }
            catch (error) {
                console.error('Erro ao obter registro de ponto atual:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    /**
     * Obtém os registros de ponto anteriores do usuário
     */
    getPreviousTimeRecords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userCode } = req.params;
                if (!userCode) {
                    return res.status(400).json({ error: 'Código do usuário é obrigatório' });
                }
                const timeRecords = yield this.timeRecordService.getPreviousTimeRecords(userCode);
                const recordsWithHours = timeRecords.map(record => (Object.assign(Object.assign({}, record), { workedHours: this.timeRecordService.calculateWorkedHours(record) })));
                return res.status(200).json(recordsWithHours);
            }
            catch (error) {
                console.error('Erro ao obter registros de ponto anteriores:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    /**
     * Registra a entrada do usuário
     */
    registerEntry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userCode } = req.body;
                if (!userCode) {
                    return res.status(400).json({ error: 'Código do usuário é obrigatório' });
                }
                const timeRecord = yield this.timeRecordService.registerEntry(userCode);
                return res.status(201).json(timeRecord);
            }
            catch (error) {
                console.error('Erro ao registrar entrada:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    /**
     * Registra a saída do usuário
     */
    registerExit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userCode } = req.body;
                if (!userCode) {
                    return res.status(400).json({ error: 'Código do usuário é obrigatório' });
                }
                const timeRecord = yield this.timeRecordService.registerExit(userCode);
                if (!timeRecord) {
                    return res.status(404).json({ error: 'Registro de ponto não encontrado ou já finalizado' });
                }
                const workedHours = this.timeRecordService.calculateWorkedHours(timeRecord);
                return res.status(200).json({
                    timeRecord,
                    workedHours
                });
            }
            catch (error) {
                console.error('Erro ao registrar saída:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
}
exports.TimeRecordController = TimeRecordController;
