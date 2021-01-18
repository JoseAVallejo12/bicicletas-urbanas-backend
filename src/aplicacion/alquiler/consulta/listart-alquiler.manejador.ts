import { Injectable } from '@nestjs/common';
import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { AlquilerDto } from './dto/alquiler.dto';

@Injectable()
export class ManejadorListarAlquiler {
  constructor(private daoAlquiler: DaoAlquiler ) {}

  async listarAlquileres(): Promise<AlquilerDto[]> {
    return this.daoAlquiler.listar();
  }

  async listarAlquiler(id: string): Promise<AlquilerDto> {
    return this.daoAlquiler.listarUno(id);
  }

  async listarEstados(estado: boolean): Promise<AlquilerDto[]> {
    return this.daoAlquiler.listarEstados(estado);
  }

}
