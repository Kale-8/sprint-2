import { Pedido } from './pedido.entity/pedido.entity'; //IMportamos la tabla Pedido
import { DataSource, Repository } from 'typeorm';

export class PedidoRepository extends Repository<Pedido> { //Definimos el repositorio personalizado para la entidad Pedido
  constructor(private dataSource: DataSource) { //Inyectamos la base de datos desde data-source.ts
    super(Pedido, dataSource.createEntityManager()); //EL super llama al constructor de Repository con la entidad Pedido y el EntityManager
  }

  async findByCliente(clienteId: number) { //Funcion para buscar pedidos por cliente
    return this.find({
      where: { cliente: { id: clienteId } }, //Condicion de busqueda por id
      relations: ['cliente', 'producto'], //Incluimos las relaciones con cliente y producto
    });
  }

  async createPedido(data: Partial<Pedido>) { //Funcion para crear un nuevo pedido
    const pedido = this.create(data); //Con this.create creamos una nueva instancia de Pedido
    return this.save(pedido); //Guardamos el pedido en la base de datos
  }
}