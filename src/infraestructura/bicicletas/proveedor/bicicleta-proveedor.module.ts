import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.manejador';
import { ManejadorRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.manejador';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';
import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioActualizarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';
import { BicicletaEntidad } from '../entidad/bicicleta.entidad';
import { DaoBicicletaProveedor } from './dao/dao-bicicleta.proveedor';
import { repositorioBicicletaProvedor } from './repositorio/repositorio-bicicleta.proveedor';
import { servicioActualizarBicicletaProveedor, servicioRegistrarBicicletaProveedor } from './servicio/servicio-actualizar-bicicleta.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaEntidad])],
  providers: [
    {
      provide: ServicioActualizarBicicleta,
      inject: [RepositorioBicicleta],
      useFactory: servicioActualizarBicicletaProveedor
    },
    {
      provide: ServicioRegistrarBicicleta,
      inject: [RepositorioBicicleta],
      useFactory: servicioRegistrarBicicletaProveedor
    },
    ManejadorListarBicicleta,
    ManejadorActualizarBicicleta,
    ManejadorRegistrarBicicleta,
    repositorioBicicletaProvedor,
    DaoBicicletaProveedor

  ],
  exports: [
    ManejadorListarBicicleta,
    ManejadorActualizarBicicleta,
    ManejadorRegistrarBicicleta,
    RepositorioBicicleta,
    DaoBicicleta
  ]
})
export class BicicletaProveedorModule {}
