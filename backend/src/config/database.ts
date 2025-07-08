import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

// Carrega variáveis de ambiente
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'ponto_ilumeo',
  synchronize: false, // Desativamos o synchronize para usar migrações
  logging: process.env.NODE_ENV === 'development',
  entities: [path.join(__dirname, '..', 'models', '*.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Função para inicializar o banco de dados com a extensão uuid-ossp
export const initializeDatabase = async () => {
  try {
    // Conecta ao banco de dados
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida');

    // Cria a extensão uuid-ossp se não existir
    await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('Extensão uuid-ossp verificada');

    // Executa as migrações pendentes
    await AppDataSource.runMigrations();
    console.log('Migrações executadas com sucesso');

    return true;
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    return false;
  }
}; 