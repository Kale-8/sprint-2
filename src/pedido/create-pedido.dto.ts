import { IsInt, IsDateString, IsPositive } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  productoId: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsDateString()
  fecha: string;
}
