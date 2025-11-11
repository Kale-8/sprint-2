import 'reflect-metadata';
import { AppDataSource } from '../../data-source';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';

async function run() {
  await AppDataSource.initialize();
  try {
    const userRepo = AppDataSource.getRepository(User);
    const clientRepo = AppDataSource.getRepository(Client);
    const productRepo = AppDataSource.getRepository(Product);

    const adminExists = await userRepo.findOne({ where: { email: 'admin@riwi.co' } });
    if (!adminExists) {
      await userRepo.save(userRepo.create({
        nombre: 'Admin',
        email: 'admin@riwi.co',
        passwordHash: 'changeme',
        rol: 'admin',
      }));
    }

    const clientExists = await clientRepo.findOne({ where: { email: 'cliente@riwi.co' } });
    if (!clientExists) {
      await clientRepo.save(clientRepo.create({
        nombre: 'Cliente Demo',
        email: 'cliente@riwi.co',
        telefono: '3000000000',
      }));
    }

    const productA = await productRepo.findOne({ where: { codigo: 'SKU-001' } });
    if (!productA) {
      await productRepo.save(productRepo.create({
        codigo: 'SKU-001',
        nombre: 'Balón fútbol',
        precio: '100000.00',
        stock: 50,
      }));
    }
    const productB = await productRepo.findOne({ where: { codigo: 'SKU-002' } });
    if (!productB) {
      await productRepo.save(productRepo.create({
        codigo: 'SKU-002',
        nombre: 'Guayos',
        precio: '250000.00',
        stock: 20,
      }));
    }

    // eslint-disable-next-line no-console
    console.log('Seed completado.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exitCode = 1;
  } finally {
    await AppDataSource.destroy();
  }
}

run();


