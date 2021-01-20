import { Module } from '@nestjs/common';
import { BicicletaControlador } from './controlador/bicicleta.controller';
import { BicicletaProveedorModule } from './proveedor/bicicleta-proveedor.module';

@Module({
  imports: [BicicletaProveedorModule],
  controllers: [BicicletaControlador]
})
export class BicicletaModule {}
