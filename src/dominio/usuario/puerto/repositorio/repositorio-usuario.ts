import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract existeCedulaUsuario(nombre: number): Promise<boolean>;
  abstract guardar(usuario: Usuario);
}
