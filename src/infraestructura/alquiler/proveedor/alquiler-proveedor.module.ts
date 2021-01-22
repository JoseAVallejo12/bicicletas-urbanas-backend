import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.manejador';
import { ManejadorListarAlquiler } from 'src/aplicacion/alquiler/consulta/listart-alquiler.manejador';
import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { AlquilerEntidad } from '../entidad/alquiler.entidad';
import { repositorioAlquilerProvedor } from './repositorio/repositorio-alquiler.proveedor';
import { servicioRegistrarAlquilerProveedor } from './servicio/servicio-registrar-alquiler.proveedor';
import { DaoAlquilerProvedor } from './dao/dao-alquiler.proveedor';
import { ManejadorFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.manejador';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { servicioFacturarAlquilerProveedor } from './servicio/servicio-facturar-alquiler.proveedor';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { BicicletaEntidad } from 'src/infraestructura/bicicletas/entidad/bicicleta.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([AlquilerEntidad, UsuarioEntidad, BicicletaEntidad])],
  providers: [
    { provide: ServicioRegistraAlquiler, inject: [RepositorioAlquiler], useFactory: servicioRegistrarAlquilerProveedor },
    { provide: ServicioFacturarAlquiler, inject: [RepositorioAlquiler], useFactory: servicioFacturarAlquilerProveedor },
    repositorioAlquilerProvedor,
    ManejadorRegistrarAlquiler,
    ManejadorListarAlquiler,
    ManejadorFacturarAlquiler,
    DaoAlquilerProvedor,
  ],
  exports: [
    ServicioRegistraAlquiler,
    ManejadorRegistrarAlquiler,
    ManejadorFacturarAlquiler,
    RepositorioAlquiler,
    ManejadorListarAlquiler,
    DaoAlquiler
  ],
})
export class AlquilerProveedorModule {}
