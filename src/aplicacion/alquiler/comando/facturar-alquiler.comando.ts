import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoFacturarAlquiler {
  @IsString()
  @ApiProperty({ example: '12' })
  public idAlquiler: string;

}
