import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ComandoFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.comando';
import { ManejadorFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.manejador';
import { ComandoRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.comando';
import { ManejadorRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.manejador';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { ManejadorListarAlquiler } from 'src/aplicacion/alquiler/consulta/listart-alquiler.manejador';

@Controller('alquiler')
export class AlquilerControlador {
  constructor(
    private manejadorRegistrarAlquiler: ManejadorRegistrarAlquiler,
    private manejadorListarAlquiler: ManejadorListarAlquiler,
    private manejadorFacturarAlquiler: ManejadorFacturarAlquiler
  ) {}

  /**
   * Lista todos los alquileres
   * @returns: array de alqulerDto
   */
  @Get('listar')
  async listar(): Promise<AlquilerDto[]> {
    return this.manejadorListarAlquiler.listarAlquileres();
  }

  /**
   * busca un id especifico
   * @param id numero unico para cada alquiler
   * @returns: objeto tipo alquilerDto
   */
  @Get('listar/:id')
  async buscarPorId(@Param('id') id:string): Promise<AlquilerDto> {
    return this.manejadorListarAlquiler.listarAlquiler(id);
  }

  /**
   * lista los alquileres abiertos "true" o cerrado "false"
   * @param estado boolean false=0, true=1
   * @returns: array de objetos alquilerDto
   */
  @Get('listar/estado/:estado')
  async buscarPorEstado(@Param('estado') estado: boolean): Promise<AlquilerDto[]> {
    return this.manejadorListarAlquiler.listarEstados(estado);
  }

  /**
   * crea un nuevo alquiler
   * @param comandoRegistrarAlquiler estructura de datos para alquiler
   */
  @Post()
  async registrarAlquiler(@Body() comandoRegistrarAlquiler: ComandoRegistrarAlquiler) {
    await this.manejadorRegistrarAlquiler.ejecutar(comandoRegistrarAlquiler);
  }

  @Put()
  async facturarAlquiler(@Body() comandoFacturarAlquiler: ComandoFacturarAlquiler) {
    await this.manejadorFacturarAlquiler.ejecutar(comandoFacturarAlquiler);
  }

}
