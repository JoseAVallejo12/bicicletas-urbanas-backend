import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioUsuarioMysql implements RepositorioUsuario {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly repositorio: Repository<UsuarioEntidad>,
  ) { }

  async existeCedulaUsuario(cedula: number): Promise<boolean> {
    return (await this.repositorio.count({ cedula })) > 0;
  }

  async usuarioHabilitado(cedula: number): Promise<boolean> {
    const estado = true;
    return (await this.repositorio.count({ where: { cedula, estado } })) > 0;
  }

  async actualizarEstado(cedula: number, estado: boolean) {
    const usuario = await this.repositorio.findOne({ cedula });
    usuario.estado = estado;
    await this.repositorio.save(usuario);
  }

  async guardar(usuario: Usuario) {
    const entidad = new UsuarioEntidad();
    entidad.nombre = usuario.nombre;
    entidad.apellido = usuario.apellido;
    entidad.estado = usuario.estado;
    entidad.fechaCreacion = usuario.fechaCreacion;
    entidad.cedula = usuario.cedula;
    entidad.correo = usuario.correo;
    entidad.telefono = usuario.telefono;
    entidad.direccion = usuario.direccion;
    await this.repositorio.save(entidad);
  }
}
