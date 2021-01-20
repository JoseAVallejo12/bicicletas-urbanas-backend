import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

@Controller('usuarios')
export class UsuarioControlador {
  constructor(
    private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
    private readonly _manejadorListarUsuario: ManejadorListarUsuario,
  ) {}

  @Get('listar')
  async listar(): Promise<UsuarioDto[]> {
    return this._manejadorListarUsuario.ejecutar();
  }

  @Get('listar/:cedula')
  async listarUno(@Param('cedula') cedula: string): Promise<UsuarioDto> {
    return this._manejadorListarUsuario.ejecutarUno(cedula);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarUsuario: ComandoRegistrarUsuario) {
    await this._manejadorRegistrarUsuario.ejecutar(comandoRegistrarUsuario);
  }
}
