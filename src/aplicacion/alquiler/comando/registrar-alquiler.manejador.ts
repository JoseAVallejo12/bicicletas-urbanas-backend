import { Injectable } from '@nestjs/common';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { ServicioRegistraAlquiler } from '../../../dominio/alquiler/servicio/servicio-registrar-alquiler';
import { ComandoRegistrarAlquiler } from './registrar-alquiler.comando';


@Injectable()
export class ManejadorRegistrarAlquiler {

  constructor(private servicioRegistrarAlquiler: ServicioRegistraAlquiler) {}

  async ejecutar(comandoRegistrarAlquiler: ComandoRegistrarAlquiler) {
    await this.servicioRegistrarAlquiler.guardar(new Alquiler(comandoRegistrarAlquiler));
  }
}
