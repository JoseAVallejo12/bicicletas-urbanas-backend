import { BicicletaDto } from 'src/aplicacion/bicicletas/dto/bicicletas.dto';

export abstract class DaoBicicleta {
  abstract listar(): Promise<BicicletaDto[]>;
  abstract listarUno(id:string): Promise<BicicletaDto>;
}
