import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldsUser1691961143985 implements MigrationInterface {
  name = 'addFieldsUser1691961143985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
  }
}
