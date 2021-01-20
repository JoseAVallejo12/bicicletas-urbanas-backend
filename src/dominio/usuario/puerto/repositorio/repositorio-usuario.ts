import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract existeCedulaUsuario(nombre: string): Promise<boolean>;
  abstract guardar(usuario: Usuario);
}
