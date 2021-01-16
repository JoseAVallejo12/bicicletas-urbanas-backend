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

@Module({
  imports: [TypeOrmModule.forFeature([AlquilerEntidad])],
  providers: [
    { provide: ServicioRegistraAlquiler, inject: [RepositorioAlquiler], useFactory: servicioRegistrarAlquilerProveedor },
    repositorioAlquilerProvedor,
    ManejadorRegistrarAlquiler,
    ManejadorListarAlquiler,
    DaoAlquilerProvedor,
  ],
  exports: [
    ServicioRegistraAlquiler,
    ManejadorRegistrarAlquiler,
    RepositorioAlquiler,
    ManejadorListarAlquiler,
    DaoAlquiler
  ],
})
export class AlquilerProveedorModule {}
