import { ApiProperty } from '@nestjs/swagger';

export class AlquilerDto {

  @ApiProperty({ example: 1 })
  idUsusario: number;

  @ApiProperty({ example: 2 })
  idBicicleta: number;

  @ApiProperty({ example: 'Barranquilla' })
  ciudad: string;

  @ApiProperty({ example: '2020-09-20 21:57:07' })
  fechaAlquiler: string;


  @ApiProperty({ example: 'abierto' })
  estado: string;

}
