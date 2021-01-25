import { IsBoolean, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarAlquiler {
  @IsString()
  @ApiProperty({ example: '72267893' })
  public cedulaUsuario: string;

  @IsString()
  @ApiProperty({ example: '6' })
  public idBicicleta: string;

  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaAlquiler: string;

  @IsString()
  @ApiProperty({ example: 'Barranquilla' })
  public ciudad: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  public estado: boolean;
}
