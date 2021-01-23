import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoFacturarAlquiler {
  @IsString()
  @ApiProperty({ example: '12' })
  public idAlquiler: string;

/*   @IsString()
  @ApiProperty({ example: '1500' })
  public valorHora: string; */

/*   @IsDateString()
  @ApiProperty({ type: Date })
  public fechaInicio: string; */

/*   @IsDateString()
  @ApiProperty({ type: Date })
  public fechaEntrega: string; */
}
