import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { Facturacion } from 'src/dominio/alquiler/modelo/facturar';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { BicicletaEntidad } from 'src/infraestructura/bicicletas/entidad/bicicleta.entidad';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { AlquilerEntidad } from '../../entidad/alquiler.entidad';

@Injectable()
export class RepositorioAlquilerMysql implements RepositorioAlquiler {
  constructor(
    @InjectRepository(AlquilerEntidad) private readonly repositorioAlquiler: Repository<AlquilerEntidad>,
    @InjectRepository(UsuarioEntidad) private readonly repositorioUsuario: Repository<UsuarioEntidad>,
    @InjectRepository(BicicletaEntidad) private readonly repoBicicleta: Repository<BicicletaEntidad>
  ) {}


  async existeUsuario(cedulaUsuario: string): Promise<boolean> {
    const cedula = parseInt(cedulaUsuario, 10);
    return (await this.repositorioUsuario.count({ cedula })) > 0;
  }


  async existeBicicleta(id: string): Promise<boolean> {
    const alquilerId = parseInt(id, 10);
    return (await this.repoBicicleta.count({ id: alquilerId })) > 0;
  }


  async existeAlquiler(id: string): Promise<boolean> {
    const alquilerId = parseInt(id, 10);
    return (await this.repositorioAlquiler.count({ id: alquilerId })) > 0;
  }


  async usuarioHabilitado(cedulaUsuario: string): Promise<boolean> {
    const cedula = parseInt(cedulaUsuario, 10);
    return await this.repositorioAlquiler.count({ where: {cedulaUsuario: cedula, estado: true }}) > 0;
  }


  async bicicletaLibre(id: string): Promise<boolean> {
    const bicicletaId = parseInt(id, 10);
    return await this.repoBicicleta.count({ where: {id: bicicletaId, estado: 'libre' }}) > 0;
  }


  async actualizarEstadoBicicleta(id: string) {
    const bicicletaId = parseInt(id, 10);
    let registroBicicleta = await this.repoBicicleta.findOne({id: bicicletaId});
    registroBicicleta.estado = 'alquilada';
    this.repoBicicleta.save(registroBicicleta);
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
