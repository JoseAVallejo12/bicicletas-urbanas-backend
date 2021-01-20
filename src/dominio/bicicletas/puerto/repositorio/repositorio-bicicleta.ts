import { Bicicleta } from '../../modelo/bicicleta';


/**
 * Clase abstracta que define los metodos a realizar en el adaptador de DB
 */
export abstract class RepositorioBicicleta {
  abstract existeIdBicicleta(id: string): Promise<boolean>;
  abstract actualizar(estado: string, idBicicleta: string): void;
  abstract guardar(bicicleta: Bicicleta): void;
}
