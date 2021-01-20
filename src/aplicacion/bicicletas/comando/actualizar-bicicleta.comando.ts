import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarBicicleta {
  @IsString()
  @ApiProperty({ example: '12' })
  public id: string;

  @IsString()
  @ApiProperty({ example: 'alquilada | libre | mantenimiento | fuera de servicio' })
  public estado: string;
}
