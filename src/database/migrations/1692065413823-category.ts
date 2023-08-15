import { MigrationInterface, QueryRunner } from 'typeorm';

export class category1692065413823 implements MigrationInterface {
  name = 'category1692065413823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `,
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "customer"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "customer"."updatedAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "customer"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
    await queryRunner.query(`DROP INDEX "IDX_15520e638eb4c46c4fb2c61c4b"`);
    await queryRunner.query(`DROP INDEX "IDX_342d06dd0583aafc156e076379"`);
    await queryRunner.query(`DROP TABLE "product_categories_category"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
