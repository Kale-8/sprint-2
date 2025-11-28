import {
  MigrationInterface, //Esto sirve para definir una migracion.
  QueryRunner, //Esto es para ejecutar queries en la base de datos.
} from 'typeorm';

export class InitSchema1762529343694 implements MigrationInterface {
  //Aca definimos la clase de la migracion osea las queries para crear o eliminar tablas.
  name = 'InitSchema1762529343694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "fecha" TIMESTAMP NOT NULL, "clienteId" integer, "productoId" integer, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" numeric NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" ADD CONSTRAINT "FK_2730a0c3947641edf256551f10c" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" ADD CONSTRAINT "FK_942e0977463b43139035d94a8da" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nombre" VARCHAR NOT NULL, "email" VARCHAR NOT NULL, "password" VARCHAR NOT NULL, "role" VARCHAR, CONSTRAINT "PK_usuario_id" PRIMARY KEY ("id"), CONSTRAINT "UQ_usuario_email" UNIQUE ("email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Aca definimos las queries para eliminar las tablas creadas en el metodo up.
    await queryRunner.query(
      `ALTER TABLE "pedido" DROP CONSTRAINT "FK_942e0977463b43139035d94a8da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" DROP CONSTRAINT "FK_2730a0c3947641edf256551f10c"`,
    );
    await queryRunner.query(`DROP TABLE "producto"`);
    await queryRunner.query(`DROP TABLE "pedido"`);
    await queryRunner.query(`DROP TABLE "cliente"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
  }
}
