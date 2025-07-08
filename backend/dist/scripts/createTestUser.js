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
require("reflect-metadata");
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const TimeRecord_1 = require("../models/TimeRecord");
const typeorm_1 = require("typeorm");
function createTestUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializa a conexão com o banco de dados
            yield database_1.AppDataSource.initialize();
            console.log('Conexão com o banco de dados estabelecida');
            // Cria a extensão uuid-ossp se não existir
            yield database_1.AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
            console.log('Extensão uuid-ossp verificada');
            // Verifica se o usuário já existe
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            let user = yield userRepository.findOne({ where: { code: '4SXXFMF' } });
            if (!user) {
                // Cria o usuário
                user = userRepository.create({
                    code: '4SXXFMF',
                    name: 'Usuário de Teste'
                });
                yield userRepository.save(user);
                console.log('Usuário criado:', user);
            }
            else {
                console.log('Usuário já existe:', user);
            }
            // Cria um registro de ponto para o usuário
            const timeRecordRepository = database_1.AppDataSource.getRepository(TimeRecord_1.TimeRecord);
            // Verifica se já existe um registro para hoje
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const existingRecord = yield timeRecordRepository.findOne({
                where: {
                    user_id: user.id,
                    entry_time: (0, typeorm_1.Between)(today, tomorrow)
                }
            });
            if (!existingRecord) {
                // Cria um novo registro de ponto
                const timeRecord = timeRecordRepository.create({
                    user_id: user.id,
                    entry_time: new Date()
                });
                yield timeRecordRepository.save(timeRecord);
                console.log('Registro de ponto criado:', timeRecord);
            }
            else {
                console.log('Já existe um registro de ponto para hoje:', existingRecord);
            }
            console.log('Script executado com sucesso!');
            process.exit(0);
        }
        catch (error) {
            console.error('Erro ao executar script:', error);
            process.exit(1);
        }
    });
}
createTestUser();
