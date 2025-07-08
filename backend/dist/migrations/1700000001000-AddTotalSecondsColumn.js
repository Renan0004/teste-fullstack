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
exports.AddTotalSecondsColumn1700000001000 = void 0;
class AddTotalSecondsColumn1700000001000 {
    constructor() {
        this.name = 'AddTotalSecondsColumn1700000001000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Adicionar a coluna total_seconds à tabela time_records
            yield queryRunner.query(`
            ALTER TABLE "time_records" 
            ADD COLUMN "total_seconds" integer
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remover a coluna total_seconds da tabela time_records
            yield queryRunner.query(`
            ALTER TABLE "time_records" 
            DROP COLUMN "total_seconds"
        `);
        });
    }
}
exports.AddTotalSecondsColumn1700000001000 = AddTotalSecondsColumn1700000001000;
