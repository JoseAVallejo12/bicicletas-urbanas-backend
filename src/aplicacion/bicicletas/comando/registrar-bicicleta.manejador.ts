import { Injectable } from '@nestjs/common';
import { Bicicleta } from 'src/dominio/bicicletas/modelo/bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';
import { ComandoRegistrarBicicleta } from './registrar-bicicleta.comando';

@Injectable()
export class ManejadorRegistrarBicicleta {

  constructor(private servicioRegistrarBicicleta: ServicioRegistrarBicicleta) {}

  async ejecutar(comandoRegistrarBicicleta: ComandoRegistrarBicicleta ) {
    await this.servicioRegistrarBicicleta.ejecutar(new Bicicleta(comandoRegistrarBicicleta));
  }
}
