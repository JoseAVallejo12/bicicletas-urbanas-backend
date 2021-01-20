import { ApiProperty } from '@nestjs/swagger';

/**
 * Esquema de datos para tranferir mensaje entre capas
 * para Alquiler
 */
export class FacturacionDto {

  @ApiProperty({ example: '12' })
  idAlquiler: string;

  @ApiProperty({ example: '1500' })
  valorHora: string;

  @ApiProperty({ example: '2020-09-20 15:57:07' })
  fechaInicio: string;

  @ApiProperty({ example: '2020-09-20 19:00:07 '})
  fechaEntrega: string;
}
