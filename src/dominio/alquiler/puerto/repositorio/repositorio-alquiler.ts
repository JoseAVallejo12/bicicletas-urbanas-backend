import { Alquiler } from '../../modelo/alquiler';
import { Facturacion } from '../../modelo/facturar';

/**
 * Clase abstracta que define los metos a realizar en el adaptador de DB
 */
export abstract class RepositorioAlquiler {
  abstract existeIdAlquiler(id: string): Promise<boolean>;
  abstract existeCedulaUsuario(cedulaUsuario: string): Promise<boolean>;
  abstract actualizar(facturacion: Facturacion ): void;
  abstract guardar(alquiler: Alquiler): void;
}
