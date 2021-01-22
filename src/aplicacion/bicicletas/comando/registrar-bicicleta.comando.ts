import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarBicicleta {

  @IsString()
  @ApiProperty({ example: 'Rogahn-Beier'})
  marca: string;

  @IsString()
  @ApiProperty({ example: 'NO66 5634 8327 343'})
  serial: string;

  @IsString()
  @ApiProperty({ example: 'Purple' })
  color: string;

  @IsString()
  @ApiProperty({ example: '1' })
  almacenActual: string;

  @IsDateString()
  @ApiProperty({ example: '2021-01-19T05:00:00.000Z'})
  fechaCompra: string;

  @IsString()
  @ApiProperty({ example: 'reservada'  })
  estado: string;

  @IsNumber()
  @ApiProperty({example: 5000 })
  valorHora: number;

  @IsString()
  @ApiProperty({example: 'Voluptate sunt molestiae corporis consequatur sequi adipisci vel provident voluptatum.' })
  descripcion: string;
}
