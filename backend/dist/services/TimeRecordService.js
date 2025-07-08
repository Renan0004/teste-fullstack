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
exports.TimeRecordService = void 0;
const TimeRecordRepository_1 = require("../repositories/TimeRecordRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class TimeRecordService {
    /**
     * Obtém o registro de ponto atual do usuário
     */
    getCurrentTimeRecord(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.findByCode(userCode);
            if (!user) {
                return null;
            }
            return TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord(user.id);
        });
    }
    /**
     * Obtém os registros de ponto anteriores do usuário
     */
    getPreviousTimeRecords(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.findByCode(userCode);
            if (!user) {
                return [];
            }
            return TimeRecordRepository_1.TimeRecordRepository.findPreviousRecords(user.id);
        });
    }
    /**
     * Registra a entrada do usuário
     */
    registerEntry(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.createIfNotExists(userCode);
            // Verifica se já existe um registro aberto para hoje
            const existingRecord = yield TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord(user.id);
            if (existingRecord && !existingRecord.exit_time) {
                return existingRecord; // Já existe um registro de entrada sem saída
            }
            return TimeRecordRepository_1.TimeRecordRepository.createEntry(user.id);
        });
    }
    /**
     * Registra a saída do usuário
     */
    registerExit(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.UserRepository.findByCode(userCode);
            if (!user) {
                return null;
            }
            const currentRecord = yield TimeRecordRepository_1.TimeRecordRepository.findCurrentDayRecord(user.id);
            if (!currentRecord || currentRecord.exit_time) {
                return null; // Não há registro aberto ou já foi fechado
            }
            return TimeRecordRepository_1.TimeRecordRepository.registerExit(currentRecord.id);
        });
    }
    /**
     * Calcula o total de horas trabalhadas em um registro
     */
    calculateWorkedHours(timeRecord) {
        if (!timeRecord.total_minutes) {
            return { hours: 0, minutes: 0, seconds: timeRecord.total_seconds || 0 };
        }
        const hours = Math.floor(timeRecord.total_minutes / 60);
        const minutes = timeRecord.total_minutes % 60;
        const seconds = timeRecord.total_seconds || 0;
        return { hours, minutes, seconds };
    }
}
exports.TimeRecordService = TimeRecordService;
