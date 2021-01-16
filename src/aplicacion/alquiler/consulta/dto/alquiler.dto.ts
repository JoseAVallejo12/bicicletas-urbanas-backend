import { ApiProperty } from '@nestjs/swagger';

/**
 * Esquema de datos para tranferir mensaje entre capas
 * para Alquiler
 */
export class AlquilerDto {

  @ApiProperty({ example: 1 })
  cedulaUsuario: string;

  @ApiProperty({ example: 2 })
  serialBicicleta: string;

  @ApiProperty({ example: '2020-09-20 21:57:07' })
  fechaAlquiler: string;

  @ApiProperty({ example: 'Barranquilla' })
  ciudad: string;

  @ApiProperty({ example: true })
  estado: boolean;

}
