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
  ) {}

  async existeCedulaUsuario(nombre: string): Promise<boolean> {
    return (await this.repositorio.count({ nombre })) > 0;
  }

  async guardar(usuario: Usuario) {
    const entidad = new UsuarioEntidad();
    entidad.nombre = usuario.nombre;
    entidad.apellido = usuario.apellido;
    entidad.clave = usuario.clave;
    entidad.fechaCreacion = usuario.fechaCreacion;
    entidad.cedula = usuario.cedula;
    entidad.correo = usuario.correo;
    entidad.telefono = usuario.telefono;
    entidad.direccion = usuario.direccion;
    await this.repositorio.save(entidad);
  }
}
