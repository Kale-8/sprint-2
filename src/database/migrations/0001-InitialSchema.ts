import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema0000000000001 implements MigrationInterface {
    name = 'InitialSchema0000000000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Crear tabla de roles
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // 2. Crear tabla de usuarios
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // 3. Crear tabla de relación usuarios-roles
        await queryRunner.createTable(new Table({
            name: 'users_roles',
            columns: [
                {
                    name: 'userId',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'roleId',
                    type: 'uuid',
                    isPrimary: true,
                },
            ],
        }), true);

        // 4. Crear tabla de clientes
        await queryRunner.createTable(new Table({
            name: 'clients',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'document',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // 5. Crear tabla de productos
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '120',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'stock',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'sku',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // 6. Crear tabla de órdenes
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'orderDate',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'paymentMethod',
                    type: 'varchar',
                },
                {
                    name: 'client_id',
                    type: 'uuid',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // 7. Set default values for status and paymentMethod
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "paymentMethod" SET DEFAULT 'CASH'`);

        // 8. Crear tabla de items de orden
        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'quantity',
                    type: 'int',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'subtotal',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'orderId',
                    type: 'uuid',
                },
                {
                    name: 'productId',
                    type: 'uuid',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // Crear claves foráneas
        await queryRunner.createForeignKey('users_roles', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('users_roles', new TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));

        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['orderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar claves foráneas primero
        await this.dropForeignKeys(queryRunner);

        // Eliminar tablas en orden inverso
        const tableNames = [
            'order_items',
            'orders',
            'products',
            'clients',
            'users_roles',
            'users',
            'roles',
        ];

        for (const tableName of tableNames) {
            await queryRunner.dropTable(tableName, true, true, true);
        }
    }

    private async dropForeignKeys(queryRunner: QueryRunner): Promise<void> {
        const foreignKeys = [
            { table: 'users_roles', column: 'userId' },
            { table: 'users_roles', column: 'roleId' },
            { table: 'orders', column: 'client_id' },
            { table: 'orders', column: 'user_id' },
            { table: 'order_items', column: 'orderId' },
            { table: 'order_items', column: 'productId' },
        ];

        for (const fk of foreignKeys) {
            const table = await queryRunner.getTable(fk.table);
            if (table) {
                const foreignKey = table.foreignKeys.find(
                    fkObj => fkObj.columnNames.indexOf(fk.column) !== -1
                );
                if (foreignKey) {
                    await queryRunner.dropForeignKey(fk.table, foreignKey);
                }
            }
        }
    }
}
