import { ApiProperty } from '@nestjs/swagger';

export class BicicletaDto {

  @ApiProperty({ example: 'Rogahn-Beier' })
  marca: string;

  @ApiProperty({ example: 'NO66 5634 8327 343' })
  serial: string;

  @ApiProperty({ example: 'Purple' })
  color: string;

  @ApiProperty({ example: '1' })
  almacenActual: string;

  @ApiProperty({ example: '2021-01-19T05:00:00.000Z' })
  fechaCompra: string;

  @ApiProperty({ example: 'reservada' })
  estado: string;

  @ApiProperty({ example: 5000 })
  valorHora: number;

  @ApiProperty({ example: 'Voluptate sunt molestiae corporis consequatur sequi adipisci vel provident voluptatum.' })
  descripcion: string;
}
