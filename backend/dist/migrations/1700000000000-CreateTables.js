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
exports.CreateTables1700000000000 = void 0;
class CreateTables1700000000000 {
    constructor() {
        this.name = 'CreateTables1700000000000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Criar tabela de usuários
            yield queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "name" character varying,
                CONSTRAINT "UQ_codes" UNIQUE ("code"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);
            // Criar tabela de registros de ponto
            yield queryRunner.query(`
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
            yield queryRunner.query(`
            ALTER TABLE "time_records" 
            ADD CONSTRAINT "FK_time_records_users" 
            FOREIGN KEY ("user_id") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE
        `);
            // Inserir usuário de teste
            yield queryRunner.query(`
            INSERT INTO "users" ("code", "name")
            VALUES ('4SXXFMF', 'Usuário de Teste')
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "time_records" DROP CONSTRAINT "FK_time_records_users"`);
            yield queryRunner.query(`DROP TABLE "time_records"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.CreateTables1700000000000 = CreateTables1700000000000;
