import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract existeCedulaUsuario(cedula: number): Promise<boolean>;
  abstract usuarioHabilitado(cedula: number): Promise<boolean>;
  abstract actualizarEstado(cedula: number, estado: boolean): void;
  abstract guardar(usuario: Usuario): void;
}
