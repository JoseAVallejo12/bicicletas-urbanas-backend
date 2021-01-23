import { Alquiler } from '../../modelo/alquiler';
import { Facturacion } from '../../modelo/facturar';
import { AlquilerInfoDto } from '../dto/alquilerInfo.dto';


export abstract class RepositorioAlquiler {
  abstract existeAlquiler(id: string): Promise<boolean>;
  abstract buscarAlquiler(id: string): Promise<AlquilerInfoDto>;
  abstract actualizar(facturacion: Facturacion ): void;
  abstract guardar(alquiler: Alquiler): void;
}
