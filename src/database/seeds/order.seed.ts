import { DataSource } from 'typeorm';
import { Order } from '../../modules/orders/entities/order.entity';
import { OrderItem } from '../../modules/orders/entities/order-item.entity';
import { Client } from '../../modules/clients/entities/client.entity';
import { Product } from '../../modules/products/entities/product.entity';

export const orderSeed = async (dataSource: DataSource) => {
  const orderRepository = dataSource.getRepository(Order);
  const orderItemRepository = dataSource.getRepository(OrderItem);
  const clientRepository = dataSource.getRepository(Client);
  const productRepository = dataSource.getRepository(Product);

  // Obtener clientes y productos existentes
  const clients = await clientRepository.find();
  const products = await productRepository.find();

  if (clients.length === 0 || products.length === 0) {
    console.log('No hay suficientes clientes o productos para crear órdenes');
    return;
  }

  const ordersData = [
    {
      client: clients[0],
      status: 'DELIVERED',
      paymentMethod: 'CREDIT_CARD',
      items: [
        { product: products[0], quantity: 2, price: products[0].price },
        { product: products[2], quantity: 1, price: products[2].price }
      ]
    },
    {
      client: clients[1],
      status: 'SHIPPED',
      paymentMethod: 'CASH',
      items: [
        { product: products[1], quantity: 1, price: products[1].price },
        { product: products[3], quantity: 3, price: products[3].price }
      ]
    },
    {
      client: clients[2],
      status: 'PENDING',
      paymentMethod: 'BANK_TRANSFER',
      items: [
        { product: products[4], quantity: 2, price: products[4].price },
        { product: products[0], quantity: 1, price: products[0].price },
        { product: products[2], quantity: 2, price: products[2].price }
      ]
    }
  ];

  for (const orderData of ordersData) {
    // Calcular el total de la orden
    const total = orderData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    // Crear la orden
    const order = orderRepository.create({
      client: orderData.client,
      status: orderData.status,
      paymentMethod: orderData.paymentMethod,
      total,
      orderDate: new Date()
    });

    await orderRepository.save(order);
    console.log(`Orden creada para el cliente: ${orderData.client.name}`);

    // Crear los items de la orden
    for (const itemData of orderData.items) {
      const orderItem = orderItemRepository.create({
        order,
        product: itemData.product,
        quantity: itemData.quantity,
        price: itemData.price,
        subtotal: itemData.price * itemData.quantity
      });

      await orderItemRepository.save(orderItem);
      console.log(`  - Item agregado: ${itemData.quantity}x ${itemData.product.name}`);
    }
  }

  console.log('Seed de órdenes completado');
};
