require('reflect-metadata');
const { DataSource } = require('typeorm');
const path = require('path');

// Configuração do banco de dados
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ponto_ilumeo',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, '..', 'models', '*.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [],
});

async function createTestUser() {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida');

    // Cria a extensão uuid-ossp se não existir
    await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('Extensão uuid-ossp verificada');

    // Cria a tabela users se não existir
    await AppDataSource.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "name" character varying,
        CONSTRAINT "UQ_codes" UNIQUE ("code"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);
    console.log('Tabela users verificada');

    // Cria a tabela time_records se não existir
    await AppDataSource.query(`
      CREATE TABLE IF NOT EXISTS "time_records" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "entry_time" TIMESTAMP NOT NULL,
        "exit_time" TIMESTAMP,
        "total_minutes" integer,
        "total_seconds" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_time_records" PRIMARY KEY ("id"),
        CONSTRAINT "FK_time_records_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
    console.log('Tabela time_records verificada');

    // Verifica se o usuário já existe
    const userResult = await AppDataSource.query(`
      SELECT * FROM "users" WHERE "code" = '4SXXFMF'
    `);

    if (userResult.length === 0) {
      // Cria o usuário de teste
      await AppDataSource.query(`
        INSERT INTO "users" ("code", "name")
        VALUES ('4SXXFMF', 'Usuário de Teste')
      `);
      console.log('Usuário de teste criado');
    } else {
      console.log('Usuário de teste já existe');
    }

    // Lista os usuários
    const users = await AppDataSource.query(`SELECT * FROM "users"`);
    console.log('Usuários:', users);

    console.log('Script executado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar script:', error);
    process.exit(1);
  }
}

createTestUser(); 