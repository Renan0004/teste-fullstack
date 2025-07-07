import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import timeRecordsRoutes from './routes/timeRecords';

// Carrega variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app = express();

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

app.use(cors(corsOptions));
app.use(express.json());

// Rotas da API
app.use('/api/time-records', timeRecordsRoutes);

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
initializeDatabase()
  .then((success) => {
    if (success) {
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    } else {
      console.error('Não foi possível iniciar o servidor devido a erros no banco de dados');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Erro ao inicializar o aplicativo:', error);
    process.exit(1);
  });

export default app; 