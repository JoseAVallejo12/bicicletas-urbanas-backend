import { Module } from '@nestjs/common';
import { AlquilerModule } from './infraestructura/alquiler/alquiler.module';
import { InfraestructuraModule } from './infraestructura/infraestructura.module';

@Module({
  imports: [
    InfraestructuraModule,
    AlquilerModule
  ],
})
export class AppModule {}
