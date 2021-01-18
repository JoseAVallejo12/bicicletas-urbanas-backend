import { Injectable } from '@nestjs/common';
import { Facturacion } from 'src/dominio/alquiler/modelo/facturar';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { ComandoFacturarAlquiler } from './facturar-alquiler.comando';

@Injectable()
export class ManejadorFacturarAlquiler {

  constructor(private servicioFacturarAlquiler: ServicioFacturarAlquiler) {}

  async ejecutar(comandoFacturarAlquiler: ComandoFacturarAlquiler) {
    await this.servicioFacturarAlquiler.actualizarAlquiler(
      new Facturacion(comandoFacturarAlquiler)
    );
  }
}
