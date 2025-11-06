import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1762434051221 implements MigrationInterface {
    name = 'InitSchema1762434051221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying NOT NULL, "direccion" character varying NOT NULL, CONSTRAINT "UQ_3cd5652ab34ca1a0a2c7a255313" UNIQUE ("email"), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL, "total" numeric(10,2) NOT NULL, "clienteId" integer, "creadoPorId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "categoria" character varying NOT NULL, "precio" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "creadoPorId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rol" character varying NOT NULL DEFAULT 'empleado', CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido_productos" ("pedido_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_5da1353e74752cc54cf5ba934b6" PRIMARY KEY ("pedido_id", "producto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_066e373b12f8f66942e5122673" ON "pedido_productos" ("pedido_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5b4dabe8bbaa96848284ca09ec" ON "pedido_productos" ("producto_id") `);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_fa6c4bc50a46cb1fa1a48c43aa2" FOREIGN KEY ("creadoPorId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_2f2b31021061356bb22a0bd6600" FOREIGN KEY ("creadoPorId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" ADD CONSTRAINT "FK_066e373b12f8f66942e51226731" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" ADD CONSTRAINT "FK_5b4dabe8bbaa96848284ca09ecc" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido_productos" DROP CONSTRAINT "FK_5b4dabe8bbaa96848284ca09ecc"`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" DROP CONSTRAINT "FK_066e373b12f8f66942e51226731"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_2f2b31021061356bb22a0bd6600"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_fa6c4bc50a46cb1fa1a48c43aa2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b4dabe8bbaa96848284ca09ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_066e373b12f8f66942e5122673"`);
        await queryRunner.query(`DROP TABLE "pedido_productos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
