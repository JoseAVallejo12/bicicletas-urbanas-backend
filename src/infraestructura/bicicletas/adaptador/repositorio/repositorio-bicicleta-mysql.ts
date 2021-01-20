import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicicleta } from 'src/dominio/bicicletas/modelo/bicicleta';
import { Repository } from 'typeorm';
import { BicicletaEntidad } from '../../entidad/bicicleta.entidad';

@Injectable()
export class RepositorioBicicletaMsql {
  constructor(
    @InjectRepository(BicicletaEntidad)
    private readonly repositorio: Repository<BicicletaEntidad>
  ) {}


  async existeIdBicicleta(id: string): Promise<boolean> {
    const bicicletaId = parseInt(id, 10);
    return (await this.repositorio.count({ id: bicicletaId })) > 0;

  }

  async actualizar(estado: string, idBicicleta: string) {
    const id = parseInt(idBicicleta, 10);
    let registroBicicleta = await this.repositorio.findOne(id);
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
