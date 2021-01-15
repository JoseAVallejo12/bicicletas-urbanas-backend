import { Alquiler } from '../../modelo/alquiler';

/**
 * Clase abstracta que define los metos a realizar en el adaptador de DB
 */
export abstract class RepositorioAlquiler {
  abstract existeIdAlquiler(id: string): Promise<boolean>;
  abstract existeCedulaUsuario(cedula: string): Promise<boolean>;
  abstract actualizarEstado(estado: string): void;
  abstract guardar(alquiler: Alquiler): void;
}