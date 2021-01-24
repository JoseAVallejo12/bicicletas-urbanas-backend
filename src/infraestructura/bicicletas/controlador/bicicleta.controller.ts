import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ComandoActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.comando';
import { ManejadorActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.manejador';
import { ComandoRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.comando';
import { ManejadorRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.manejador';
import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';

@Controller('bicicleta')
export class BicicletaControlador {
  constructor(
    private manejadorListarBicicletas: ManejadorListarBicicleta,
    private manejadorActualizarBicicleta: ManejadorActualizarBicicleta,
    private manejadorRegistrarBicicleta: ManejadorRegistrarBicicleta
  ) { }


  @Get('listar')
  async listar(): Promise<BicicletaDto[]> {
    return this.manejadorListarBicicletas.listarBicicletas();
  }

  @Get('listar/:id')
  async buscarPorId(@Param('id') id: string): Promise<BicicletaDto> {
    return this.manejadorListarBicicletas.listarBicicleta(id);
  }

  @Post()
  async crearBicicleta(@Body() comandoRegistrarBicicleta: ComandoRegistrarBicicleta) {
    this.manejadorRegistrarBicicleta.ejecutar(comandoRegistrarBicicleta);
  }

  @Put()
  async actualizarEstado(@Body() comandoActualizarBicicleta: ComandoActualizarBicicleta) {
    this.manejadorActualizarBicicleta.ejecutar(comandoActualizarBicicleta);
  }
}
