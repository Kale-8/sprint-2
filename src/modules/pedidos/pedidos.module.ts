import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  exports: [TypeOrmModule],
})
export class PedidosModule {}
