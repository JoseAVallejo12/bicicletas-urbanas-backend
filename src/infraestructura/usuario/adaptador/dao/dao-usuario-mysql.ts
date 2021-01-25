import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

@Injectable()
export class DaoUsuarioMysql implements DaoUsuario {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  /**
   * Lista todos los usuarios en Db
   * @returns: array de UsuarioDto
   */
  async listar(): Promise<UsuarioDto[]> {
    return this.entityManager.query(
      'SELECT * FROM usuario',
    );
  }

  /**
   * Busca usuarios con numero de cedula especificado
   * @param: numero de cedula
   * @returns: array con UsuarioDto si exite, sino array vacio
   */
  async listarUno(cedula: string): Promise<UsuarioDto> {
    const cedulaInt = parseInt(cedula, 10);
    const queryString = `SELECT * FROM usuario WHERE usuario.cedula=${cedulaInt}`;
    return this.entityManager.query(queryString);
  }
}
