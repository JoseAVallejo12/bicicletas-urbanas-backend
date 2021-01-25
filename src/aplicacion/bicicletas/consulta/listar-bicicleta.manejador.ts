import { Injectable } from '@nestjs/common';
import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { BicicletaDto } from './dto/bicicletas.dto';

@Injectable()
export class ManejadorListarBicicleta {
  constructor(private daoBicicleta: DaoBicicleta) { }

  async listarBicicletas(): Promise<BicicletaDto[]> {
    return this.daoBicicleta.listar();
  }

  async listarBicicleta(id: string): Promise<BicicletaDto> {
    return this.daoBicicleta.listarUno(id);
  }
}
