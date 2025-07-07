import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalSecondsColumn1700000001000 implements MigrationInterface {
    name = 'AddTotalSecondsColumn1700000001000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar a coluna total_seconds à tabela time_records
        await queryRunner.query(`
            ALTER TABLE "time_records" 
            ADD COLUMN "total_seconds" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna total_seconds da tabela time_records
        await queryRunner.query(`
            ALTER TABLE "time_records" 
            DROP COLUMN "total_seconds"
        `);
    }
} 