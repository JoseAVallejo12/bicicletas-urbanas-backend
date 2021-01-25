import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ComandoRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.comando';
import { ManejadorRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.manejador';
import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';

@Controller('bicicleta')
export class BicicletaControlador {
  constructor(
    private manejadorListarBicicletas: ManejadorListarBicicleta,
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

}
