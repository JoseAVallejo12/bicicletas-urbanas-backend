import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';

/**
 * Clase abstracta para hacer consultas en tabla alquiler
 */
export abstract class DaoAlquiler {
  abstract listar(): Promise<AlquilerDto[]>;
  abstract listarUno(id: string): Promise<AlquilerDto>;
  abstract listarEstados(estado:boolean): Promise<AlquilerDto[]>;
}
