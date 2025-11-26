import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddRefreshTokens0000000000002 implements MigrationInterface {
  name = 'AddRefreshTokens0000000000002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'refresh_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'tokenHash',
          type: 'varchar',
        },
        {
          name: 'expiresAt',
          type: 'timestamp',
        },
        {
          name: 'isRevoked',
          type: 'boolean',
          default: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP'
        }
      ]
    }), true);

    await queryRunner.createForeignKey('refresh_tokens', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('refresh_tokens');
    if (table) {
      for (const fk of table.foreignKeys) {
        await queryRunner.dropForeignKey('refresh_tokens', fk);
      }
    }
    await queryRunner.dropTable('refresh_tokens', true, true, true);
  }
}
