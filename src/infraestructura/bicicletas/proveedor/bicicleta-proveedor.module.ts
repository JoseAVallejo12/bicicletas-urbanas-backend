import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.manejador';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';
import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioActualizarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta';
import { BicicletaEntidad } from '../entidad/bicicleta.entidad';
import { DaoBicicletaProveedor } from './dao/dao-bicicleta.proveedor';
import { repositorioBicicletaProvedor } from './repositorio/repositorio-bicicleta.proveedor';
import { servicioActualizarBicicletaProveedor } from './servicio/servicio-actualizar-bicicleta.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaEntidad])],
  providers: [
    {
      provide: ServicioActualizarBicicleta,
      inject: [RepositorioBicicleta],
      useFactory: servicioActualizarBicicletaProveedor
    },
    ManejadorListarBicicleta,
    ManejadorActualizarBicicleta,
    repositorioBicicletaProvedor,
    DaoBicicletaProveedor

  ],
  exports: [
    ManejadorListarBicicleta,
    ManejadorActualizarBicicleta,
    RepositorioBicicleta,
    DaoBicicleta
  ]
})
export class BicicletaProveedorModule {}
