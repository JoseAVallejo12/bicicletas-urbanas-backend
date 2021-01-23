import { Bicicleta } from '../../modelo/bicicleta';


/**
 * Clase abstracta que define los metodos a realizar en el adaptador de DB
 */
export abstract class RepositorioBicicleta {
  abstract existeBicicleta(id: number): Promise<boolean>;
  abstract bicicletaHabilitada(id: number): Promise<boolean>;
  abstract actualizarEstado(id: number, estado: string): void;
  abstract guardar(bicicleta: Bicicleta): void;
}
