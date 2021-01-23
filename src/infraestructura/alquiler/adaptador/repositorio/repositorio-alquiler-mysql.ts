import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { Facturacion } from 'src/dominio/alquiler/modelo/facturar';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { Repository } from 'typeorm';
import { AlquilerEntidad } from '../../entidad/alquiler.entidad';

@Injectable()
export class RepositorioAlquilerMysql implements RepositorioAlquiler {
  constructor(
    @InjectRepository(AlquilerEntidad) private readonly repositorioAlquiler: Repository<AlquilerEntidad>,
  ) {}



  async existeAlquiler(id: string): Promise<boolean> {
    const alquilerId = parseInt(id, 10);
    return (await this.repositorioAlquiler.count({ id: alquilerId })) > 0;
  }


  async actualizar(facturacion: Facturacion): Promise<void> {
    const id = parseInt(facturacion.idAlquiler, 10);
    let registroAlquiler = await this.repositorioAlquiler.findOne(id);
    registroAlquiler.estado = false;
    registroAlquiler.fechaEntrega = facturacion.fechaEntrega;
    registroAlquiler.horasTranscurridas = facturacion.totalHoras;
    registroAlquiler.total = facturacion.total;
    this.repositorioAlquiler.save(registroAlquiler);
  }


  async guardar(alquiler: Alquiler) {
    const entidad = new AlquilerEntidad();
    entidad.cedulaUsuario = alquiler.cedulaUsuario;
    entidad.idBicicleta = alquiler.idBicicleta;
    entidad.fechaAlquiler = alquiler.fechaAlquiler;
    entidad.ciudad = alquiler.ciudad;
    entidad.estado = alquiler.estado;
    await this.repositorioAlquiler.save(entidad);
  }
}
