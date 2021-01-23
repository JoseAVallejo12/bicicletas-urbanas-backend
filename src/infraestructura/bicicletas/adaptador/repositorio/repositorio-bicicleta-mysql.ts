import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicicleta } from 'src/dominio/bicicletas/modelo/bicicleta';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { Repository } from 'typeorm';
import { BicicletaEntidad } from '../../entidad/bicicleta.entidad';

@Injectable()
export class RepositorioBicicletaMsql implements RepositorioBicicleta {
  constructor(
    @InjectRepository(BicicletaEntidad)
    private readonly repositorio: Repository<BicicletaEntidad>
  ) {}


  async existeBicicleta(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;
  }

  async bicicletaHabilitada (id:number): Promise<boolean> {
    const estado = 'libre';
    return (await this.repositorio.count({ where: {id, estado}})) > 0;
  }

  async actualizarEstado(id: number, estado: string) {
    let registroBicicleta = await this.repositorio.findOne({ id });
    registroBicicleta.estado = estado;
    this.repositorio.save(registroBicicleta);
  }

  async guardar(bicicleta: Bicicleta) {
    const entidad = new BicicletaEntidad();
    entidad.almacenActual = parseInt(bicicleta.almacenActual, 10);
    entidad.color = bicicleta.color;
    entidad.descripcion = bicicleta.descripcion;
    entidad.fechaCompra = bicicleta.fechaCompra;
    entidad.marca = bicicleta.marca;
    entidad.serial = bicicleta.serial;
    entidad.valorHora = bicicleta.valorHora.toString();
    entidad.estado = bicicleta.estado;
    await this.repositorio.save(entidad);
  }
}
