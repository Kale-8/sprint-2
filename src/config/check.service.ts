import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckService {
  private readonly logger = new Logger(CheckService.name);

  async checkDatabaseConnection(dataSource: DataSource) {
    try {
      const queryResult = await dataSource.query('SELECT NOW();');
      this.logger.log(' Conectado a la base de datos exitosamente');
    } catch (error) {
      this.logger.error(' Error al conectar a la base de datos:', error.message);
    }
  }
}