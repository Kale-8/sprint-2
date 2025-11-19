import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/entities/product.entity';

export const productSeed = async (dataSource: DataSource) => {
  const productRepository = dataSource.getRepository(Product);
  
  const productsData = [
    {
      name: 'Camiseta Deportiva',
      description: 'Camiseta transpirable para entrenamiento',
      price: 29.99,
      stock: 100,
      sku: 'CAM-001'
    },
    {
      name: 'Pantalón Deportivo',
      description: 'Pantalón cómodo para ejercicio',
      price: 49.99,
      stock: 75,
      sku: 'PAN-001'
    },
    {
      name: 'Zapatillas Running',
      description: 'Zapatillas para correr con amortiguación',
      price: 89.99,
      stock: 50,
      sku: 'ZAP-001'
    },
    {
      name: 'Gorra Deportiva',
      description: 'Gorra ajustable para deportes al aire libre',
      price: 19.99,
      stock: 120,
      sku: 'GOR-001'
    },
    {
      name: 'Mochila Deportiva',
      description: 'Mochila resistente para gimnasio',
      price: 39.99,
      stock: 40,
      sku: 'MOC-001'
    }
  ];

  for (const productData of productsData) {
    const existingProduct = await productRepository.findOne({
      where: { sku: productData.sku as any }
    });

    if (!existingProduct) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`Producto creado: ${product.name}`);
    } else {
      console.log(`El producto con SKU ${productData.sku} ya existe`);
    }
  }

  console.log('Seed de productos completado');
};
