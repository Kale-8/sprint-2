import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1731340000000 implements MigrationInterface {
  name = 'InitialSchema1731340000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "usuarios_rol_enum" AS ENUM ('admin', 'vendedor')`,
    );
    await queryRunner.query(`
      CREATE TABLE "usuarios" (
        "id" SERIAL PRIMARY KEY,
        "nombre" VARCHAR(100) NOT NULL,
        "email" VARCHAR(150) NOT NULL UNIQUE,
        "passwordHash" VARCHAR(255) NOT NULL,
        "rol" "usuarios_rol_enum" NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "clientes" (
        "id" SERIAL PRIMARY KEY,
        "nombre" VARCHAR(150) NOT NULL,
        "email" VARCHAR(150) NOT NULL UNIQUE,
        "telefono" VARCHAR(30),
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "productos" (
        "id" SERIAL PRIMARY KEY,
        "codigo" VARCHAR(50) NOT NULL UNIQUE,
        "nombre" VARCHAR(150) NOT NULL,
        "precio" NUMERIC(10,2) NOT NULL,
        "stock" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(
      `CREATE TYPE "pedidos_estado_enum" AS ENUM ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')`,
    );
    await queryRunner.query(`
      CREATE TABLE "pedidos" (
        "id" SERIAL PRIMARY KEY,
        "clienteId" INT NOT NULL,
        "vendedorId" INT NOT NULL,
        "total" NUMERIC(10,2) NOT NULL,
        "estado" "pedidos_estado_enum" NOT NULL DEFAULT 'pendiente',
        "fechaPedido" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "fk_pedidos_cliente" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT,
        CONSTRAINT "fk_pedidos_vendedor" FOREIGN KEY ("vendedorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "pedido_productos" (
        "id" SERIAL PRIMARY KEY,
        "pedidoId" INT NOT NULL,
        "productoId" INT NOT NULL,
        "cantidad" INT NOT NULL,
        "precioUnitario" NUMERIC(10,2) NOT NULL,
        "subtotal" NUMERIC(10,2) NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "fk_pedido_productos_pedido" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_pedido_productos_producto" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pedido_productos"`);
    await queryRunner.query(`DROP TABLE "pedidos"`);
    await queryRunner.query(`DROP TYPE "pedidos_estado_enum"`);
    await queryRunner.query(`DROP TABLE "productos"`);
    await queryRunner.query(`DROP TABLE "clientes"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TYPE "usuarios_rol_enum"`);
  }
}
