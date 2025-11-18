import { DataSource } from 'typeorm';
import { Client } from '../../modules/clients/entities/client.entity';

export const clientSeed = async (dataSource: DataSource) => {
  const clientRepository = dataSource.getRepository(Client);
  
  const clientsData = [
    {
      name: 'Juan Pérez',
      document: '12345678',
      email: 'juan.perez@example.com',
      phone: '1234567890',
      address: 'Calle Falsa 123',
      city: 'Bogotá',
      country: 'Colombia'
    },
    {
      name: 'María García',
      document: '87654321',
      email: 'maria.garcia@example.com',
      phone: '0987654321',
      address: 'Avenida Siempreviva 742',
      city: 'Medellín',
      country: 'Colombia'
    },
    {
      name: 'Empresa XYZ S.A.S',
      document: '901234567-1',
      email: 'contacto@empresaxyz.com',
      phone: '1234567',
      address: 'Carrera 45 #26-85',
      city: 'Cali',
      country: 'Colombia'
    },
    {
      name: 'Carlos López',
      document: '1122334455',
      email: 'carlos.lopez@example.com',
      phone: '3001234567',
      address: 'Calle 100 #15-20',
      city: 'Barranquilla',
      country: 'Colombia'
    },
    {
      name: 'Ana Torres',
      document: '9988776655',
      email: 'ana.torres@example.com',
      phone: '3109876543',
      address: 'Carrera 7 #40-50',
      city: 'Bogotá',
      country: 'Colombia'
    }
  ];

  for (const clientData of clientsData) {
    const existingClient = await clientRepository.findOne({
      where: { document: clientData.document as any }
    });

    if (!existingClient) {
      const client = clientRepository.create(clientData);
      await clientRepository.save(client);
      console.log(`Cliente creado: ${client.name}`);
    } else {
      console.log(`El cliente con documento ${clientData.document} ya existe`);
    }
  }

  console.log('Seed de clientes completado');
};
