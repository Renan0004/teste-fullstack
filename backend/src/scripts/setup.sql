-- Cria a extensão uuid-ossp se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria a tabela users se não existir
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "code" character varying NOT NULL,
  "name" character varying,
  CONSTRAINT "UQ_codes" UNIQUE ("code"),
  CONSTRAINT "PK_users" PRIMARY KEY ("id")
);

-- Cria a tabela time_records se não existir
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
);

-- Insere o usuário de teste se não existir
INSERT INTO "users" ("code", "name")
SELECT '4SXXFMF', 'Usuário de Teste'
WHERE NOT EXISTS (
  SELECT 1 FROM "users" WHERE "code" = '4SXXFMF'
);

-- Lista os usuários
SELECT * FROM "users"; 