import { DataSource } from 'typeorm';
import { ApiKey } from '../auth/entities/api-key.entity';
import { User } from '../users/user.entity';
import { hashString } from '../common/utils/hash.util';
import { randomBytes } from 'crypto';

export async function seedApiKeys(dataSource: DataSource) {
    const apiKeyRepository = dataSource.getRepository(ApiKey);
    const userRepository = dataSource.getRepository(User);

    console.log('🔑 Seeding API keys...');

    // Buscar usuario admin para asociar las keys
    const adminUser = await userRepository.findOne({ where: { email: 'admin@sportsline.com' } });

    // API Key de prueba para desarrollo
    const testKeyPlain = 'sk_test_' + randomBytes(32).toString('hex');
    const testKeyHash = await hashString(testKeyPlain);

    let testKey = await apiKeyRepository.findOne({ where: { nombre: 'Test API Key' } });
    if (!testKey) {
        testKey = apiKeyRepository.create({
            nombre: 'Test API Key',
            keyHash: testKeyHash,
            scopes: ['products:read', 'products:write', 'orders:read', 'orders:write'],
            createdById: adminUser?.id || null,
        });
        await apiKeyRepository.save(testKey);
        console.log(`  ✓ Created Test API Key: ${testKeyPlain}`);
        console.log(`    Scopes: products:read, products:write, orders:read, orders:write`);
    }

    // API Key de solo lectura
    const readOnlyKeyPlain = 'sk_readonly_' + randomBytes(32).toString('hex');
    const readOnlyKeyHash = await hashString(readOnlyKeyPlain);

    let readOnlyKey = await apiKeyRepository.findOne({ where: { nombre: 'Read-Only API Key' } });
    if (!readOnlyKey) {
        readOnlyKey = apiKeyRepository.create({
            nombre: 'Read-Only API Key',
            keyHash: readOnlyKeyHash,
            scopes: ['products:read', 'clients:read', 'orders:read'],
            createdById: adminUser?.id || null,
        });
        await apiKeyRepository.save(readOnlyKey);
        console.log(`  ✓ Created Read-Only API Key: ${readOnlyKeyPlain}`);
        console.log(`    Scopes: products:read, clients:read, orders:read`);
    }

    // API Key con expiración (30 días)
    const tempKeyPlain = 'sk_temp_' + randomBytes(32).toString('hex');
    const tempKeyHash = await hashString(tempKeyPlain);
    const expiraEn = new Date();
    expiraEn.setDate(expiraEn.getDate() + 30);

    let tempKey = await apiKeyRepository.findOne({ where: { nombre: 'Temporary API Key' } });
    if (!tempKey) {
        tempKey = apiKeyRepository.create({
            nombre: 'Temporary API Key',
            keyHash: tempKeyHash,
            scopes: ['products:read'],
            expiraEn,
            createdById: adminUser?.id || null,
        });
        await apiKeyRepository.save(tempKey);
        console.log(`  ✓ Created Temporary API Key (expires in 30 days): ${tempKeyPlain}`);
        console.log(`    Scopes: products:read`);
    }

    console.log('✅ API keys seeded successfully!');
    console.log('\n📝 Save these API keys for testing (they won\'t be shown again):');
    console.log(`   Test Key: ${testKeyPlain}`);
    console.log(`   Read-Only Key: ${readOnlyKeyPlain}`);
    console.log(`   Temporary Key: ${tempKeyPlain}`);
}
