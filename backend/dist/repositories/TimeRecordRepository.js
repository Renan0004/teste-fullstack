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
exports.TimeRecordRepository = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../config/database");
const TimeRecord_1 = require("../models/TimeRecord");
exports.TimeRecordRepository = database_1.AppDataSource.getRepository(TimeRecord_1.TimeRecord).extend({
    findCurrentDayRecord(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return this.findOne({
                where: {
                    user_id: userId,
                    entry_time: (0, typeorm_1.Between)(today, tomorrow)
                },
                order: {
                    entry_time: 'DESC'
                }
            });
        });
    },
    findPreviousRecords(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, limit = 10) {
            // Busca registros completos (com data de saída)
            return this.find({
                where: {
                    user_id: userId,
                    exit_time: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                },
                order: {
                    entry_time: 'DESC'
                },
                take: limit
            });
        });
    },
    createEntry(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeRecord = this.create({
                user_id: userId,
                entry_time: new Date()
            });
            return this.save(timeRecord);
        });
    },
    registerExit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeRecord = yield this.findOne({ where: { id } });
            if (!timeRecord || timeRecord.exit_time) {
                return null;
            }
            const exitTime = new Date();
            const entryTime = new Date(timeRecord.entry_time);
            // Calcula a diferença em milissegundos
            const diffMs = exitTime.getTime() - entryTime.getTime();
            // Calcula a diferença em segundos (total)
            const totalSeconds = Math.floor(diffMs / 1000);
            // Calcula a diferença em minutos
            const diffMinutes = Math.floor(totalSeconds / 60);
            // Armazena os segundos restantes (após remover os minutos completos)
            const remainingSeconds = totalSeconds % 60;
            timeRecord.exit_time = exitTime;
            timeRecord.total_minutes = diffMinutes;
            timeRecord.total_seconds = remainingSeconds;
            return this.save(timeRecord);
        });
    }
});
