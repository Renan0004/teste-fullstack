import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1700000000000 implements MigrationInterface {
    name = 'CreateTables1700000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar tabela de usuários
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "name" character varying,
                CONSTRAINT "UQ_codes" UNIQUE ("code"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Criar tabela de registros de ponto
        await queryRunner.query(`
            CREATE TABLE "time_records" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "entry_time" TIMESTAMP NOT NULL,
                "exit_time" TIMESTAMP,
                "total_minutes" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_time_records" PRIMARY KEY ("id")
            )
        `);

        // Adicionar chave estrangeira
        await queryRunner.query(`
            ALTER TABLE "time_records" 
            ADD CONSTRAINT "FK_time_records_users" 
            FOREIGN KEY ("user_id") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE
        `);

        // Inserir usuário de teste
        await queryRunner.query(`
            INSERT INTO "users" ("code", "name")
            VALUES ('4SXXFMF', 'Usuário de Teste')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_records" DROP CONSTRAINT "FK_time_records_users"`);
        await queryRunner.query(`DROP TABLE "time_records"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
} 