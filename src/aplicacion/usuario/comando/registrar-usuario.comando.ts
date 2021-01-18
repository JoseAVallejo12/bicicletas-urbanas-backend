import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { date } from '@hapi/joi';

export class ComandoRegistrarUsuario {
  @IsString()
  @ApiProperty({ example: 'William'})
  public nombre: string;

  @IsString()
  @ApiProperty({ example: 'Smith'})
  public apellido: string;

  @IsString()
  @ApiProperty({ minLength: 4, example: '1234' })
  public clave: string;

  @IsDateString()
  @ApiProperty({ type: date })
  public fechaCreacion: string;

  @IsString()
  @ApiProperty({ minLength: 10, example: '1045456806'  })
  public cedula: string;

  @IsString()
  @ApiProperty({ example: 'william.smith@gmail.com'})
  public correo: string;

  @IsString()
  @ApiProperty({ minLength: 18, example: '+46 964 160 5074'})
  public telefono: string;

  @IsString()
  @ApiProperty({ example: '5487 Graceland Road'})
  public direccion: string;
}
