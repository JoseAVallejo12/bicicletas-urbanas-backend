import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';
import { BicicletaEntidad } from '../entidad/bicicleta.entidad';
import { DaoBicicletaProveedor } from './dao/dao-bicicleta.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaEntidad])],
  providers: [
    ManejadorListarBicicleta,
    DaoBicicletaProveedor

  ],
  exports: [
    ManejadorListarBicicleta
  ]
})
export class BicicletaProveedorModule {}
