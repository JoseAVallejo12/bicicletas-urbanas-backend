import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { Repository } from 'typeorm';
import { AlquilerEntidad } from '../../entidad/alquiler.entidad';

@Injectable()
export class RepositorioAlquilerMysql implements RepositorioAlquiler {
  constructor(
    @InjectRepository(AlquilerEntidad)
    private readonly repositorio: Repository<AlquilerEntidad>
  ) {}

  /**
   * verificar que exite el registro alquiler en db
   * @param id alquiler
   * @returns: true si exite, de lo contrario false
   */
  async existeIdAlquiler(id: string): Promise<boolean> {
    const alquilerId = parseInt(id, 10);
    return (await this.repositorio.count({ id: alquilerId })) > 0;
  }

  /**
   * Validar que un usuario no tenga mas de dos alquileres en estado activo
   * @param cedulaUsuario valor unico para cada usuario
   * @returns: true si ya tiene un alquiler activo
   */
  async existeCedulaUsuario(cedulaUsuario: string): Promise<boolean> {
    return await this.repositorio.count({ where: {cedulaUsuario, estado: true }}) > 0;
  }

  /**
   * Actualizar el estado de un alquieler luego de devuelta la bicicleta
   * @param estado del alquiler true "abierto" o false "cerrado"
   * @param id registro unico de alquiler
   */
  async actualizarEstado(estado: boolean, id:string) {
    const alquilerId = parseInt(id, 10);
    await this.repositorio.update(alquilerId, { estado });
  }

  /**
   * guerda un nuevo alquiler en base de datos
   * @param alquiler de tipo objeto de dominio
   */
  async guardar(alquiler: Alquiler) {
    const entidad = new AlquilerEntidad();
    entidad.cedulaUsuario = alquiler.cedulaUsuario;
    entidad.serialBicicleta = alquiler.serialBicicleta;
    entidad.fechaAlquiler = alquiler.fechaAlquiler;
    entidad.ciudad = alquiler.ciudad;
    entidad.estado = alquiler.estado;
    await this.repositorio.save(entidad);
  }
}