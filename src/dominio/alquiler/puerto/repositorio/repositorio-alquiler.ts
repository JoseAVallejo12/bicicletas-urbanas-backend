import { Alquiler } from '../../modelo/alquiler';
import { Facturacion } from '../../modelo/facturar';

/**
 * Clase abstracta que define los metos a realizar en el adaptador de DB
 */
export abstract class RepositorioAlquiler {
  abstract existeAlquiler(id: string): Promise<boolean>;
  abstract usuarioHabilitado(cedulaUsuario: string): Promise<boolean>;
  abstract existeUsuario(cedulaUsuario: string): Promise<boolean>;
  abstract existeBicicleta(id: string): Promise<boolean>;
  abstract bicicletaLibre(id: string): Promise<boolean>;
  abstract actualizarEstadoBicicleta(id: string): void;
  abstract actualizar(facturacion: Facturacion ): void;
  abstract guardar(alquiler: Alquiler): void;
}
