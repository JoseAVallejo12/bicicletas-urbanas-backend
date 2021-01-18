import { Bicicleta } from '../../modelo/bicicleta';


/**
 * Clase abstracta que define los metodos a realizar en el adaptador de DB
 */
export abstract class RepositorioBicicleta {
  abstract existeSerialBicicleta(id: string): Promise<boolean>;
  abstract guardar(bicicleta: Bicicleta): void;
}