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
  ) {}

  async listar(): Promise<UsuarioDto[]> {
    return this.entityManager.query(
      'SELECT * FROM usuario',
    );
  }

  async listarUno(id: string): Promise<UsuarioDto> {
    const queryString = `SELECT * FROM usuario WHERE usuario.id=${id}`;
    return this.entityManager.query(queryString);
  }
}
