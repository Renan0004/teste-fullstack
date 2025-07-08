"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const timeRecords_1 = __importDefault(require("./routes/timeRecords"));
// Carrega variáveis de ambiente
dotenv_1.default.config();
// Cria a aplicação Express
const app = (0, express_1.default)();
// Configurações do middleware
// Configuração do CORS para permitir requisições do frontend
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://ponto-ilumeo.vercel.app', 'http://localhost:3000']
        : 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Rotas da API
app.use('/api/time-records', timeRecords_1.default);
// Rota de saúde para verificar se a API está funcionando
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API de controle de ponto funcionando!' });
});
// Rota de teste
app.get('/', (req, res) => {
    res.send('API de controle de ponto funcionando!');
});
// Porta do servidor
const PORT = process.env.PORT || 3001;
// Inicializa o banco de dados e inicia o servidor
(0, database_1.initializeDatabase)()
    .then((success) => {
    if (success) {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    }
    else {
        console.error('Não foi possível iniciar o servidor devido a erros no banco de dados');
        process.exit(1);
    }
})
    .catch((error) => {
    console.error('Erro ao inicializar o aplicativo:', error);
    process.exit(1);
});
exports.default = app;
