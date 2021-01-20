import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ComandoActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.comando';
import { ManejadorActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.manejador';
import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';

@Controller('bicicleta')
export class BicicletaControlador {
  constructor(
    private manejadorListarBicicletas: ManejadorListarBicicleta,
    private manejadorActualizarBicicleta: ManejadorActualizarBicicleta,
  ) {}

  /**
   * Lista todos las bicicletas
   * @returns: array de BicicletaDto
   */
  @Get('listar')
  async listar(): Promise<BicicletaDto[]> {
    return this.manejadorListarBicicletas.listarBicicletas();
  }

  /**
   * buscar un id especifico
   * @param: id numero unico para cada bicicleta
   * @returns: objeto tipo BicicletaDto
   */
  @Get('listar/:id')
  async buscarPorId(@Param('id') id: string): Promise<BicicletaDto> {
    return this.manejadorListarBicicletas.listarBicicleta(id);
  }

  @Put()
  async actualizarEstado(@Body() comandoActualizarBicicleta: ComandoActualizarBicicleta ) {
    this.manejadorActualizarBicicleta.ejecutar(comandoActualizarBicicleta);
  }
}
