import { date } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {

  @ApiProperty({ example: 'William'})
  nombre: string;

  @ApiProperty({ example: 'Smith'})
  apellido: string;

  @ApiProperty({ minLength: 4, example: '1234' })
  clave: string;

  @ApiProperty({ type: date })
  fechaCreacion: string;

  @ApiProperty({ minLength: 10, example: '1045456806'  })
  cedula: string;

  @ApiProperty({ example: 'william.smith@gmail.com'})
  correo: string;

  @ApiProperty({ minLength: 18, example: '+46 964 160 5074'})
  telefono: string;

  @ApiProperty({ example: '5487 Graceland Road'})
  direccion: string;
}
