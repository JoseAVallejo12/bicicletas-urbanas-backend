import { Module } from '@nestjs/common';
import { AlquilerControlador } from './controlador/alquiler.controller';
import { AlquilerProveedorModule } from './proveedor/alquiler-proveedor.module';

@Module({
  imports: [AlquilerProveedorModule],
  controllers: [AlquilerControlador]
})
export class AlquilerModule { }
