import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { EntityManager } from 'typeorm';

@Injectable()
export class DaoAlquilerMysql implements DaoAlquiler {
  #sqlConsulta: string;

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager) {
    this.#sqlConsulta = '';
  }


  async listar(): Promise<AlquilerDto[]> {
    this.#sqlConsulta = 'SELECT * FROM alquiler';
    return this.entityManager.query(this.#sqlConsulta);
  }


  async listarUno(id: string): Promise<AlquilerDto> {
    this.#sqlConsulta = `SELECT * FROM alquiler WHERE alquiler.id=${parseInt(id, 10)}`;
    return this.entityManager.query(this.#sqlConsulta);
  }


  async listarEstados(estado: boolean): Promise<AlquilerDto[]> {
    this.#sqlConsulta = `SELECT * FROM alquiler WHERE alquiler.estado=${estado}`;
    return this.entityManager.query(this.#sqlConsulta);
  }
}
