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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carrega variáveis de ambiente
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ponto_ilumeo',
    synchronize: false, // Desativamos o synchronize para usar migrações
    logging: process.env.NODE_ENV === 'development',
    entities: [path_1.default.join(__dirname, '..', 'models', '*.{ts,js}')],
    migrations: [path_1.default.join(__dirname, '..', 'migrations', '*.{ts,js}')],
    subscribers: [],
});
// Função para inicializar o banco de dados com a extensão uuid-ossp
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conecta ao banco de dados
        yield exports.AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        // Cria a extensão uuid-ossp se não existir
        yield exports.AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        console.log('Extensão uuid-ossp verificada');
        // Executa as migrações pendentes
        yield exports.AppDataSource.runMigrations();
        console.log('Migrações executadas com sucesso');
        return true;
    }
    catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
        return false;
    }
});
exports.initializeDatabase = initializeDatabase;
