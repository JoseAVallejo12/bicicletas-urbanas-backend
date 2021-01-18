import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BicicletaDto } from 'src/aplicacion/bicicletas/dto/bicicletas.dto';
import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { EntityManager } from 'typeorm';

@Injectable()
export class DaoBicicletaMysql implements DaoBicicleta {
  #sqlConsulta: string;

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {
    this.#sqlConsulta = '';
  }

  async listar(): Promise<BicicletaDto[]> {
    this.#sqlConsulta = 'SELECT * FROM bicicleta';
    return this.entityManager.query(this.#sqlConsulta);
  }

  async listarUno(id: string): Promise<BicicletaDto> {
    this.#sqlConsulta = `SELECT * FROM bicicleta WHERE bicicleta.id=${parseInt(id, 10)}`;
    return this.entityManager.query(this.#sqlConsulta);
  }
}
