import { Injectable } from '@nestjs/common';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { ComandoFacturarAlquiler } from './facturar-alquiler.comando';

@Injectable()
export class ManejadorFacturarAlquiler {

  constructor(private servicioFacturarAlquiler: ServicioFacturarAlquiler) {}

  async ejecutar(comandoFacturarAlquiler: ComandoFacturarAlquiler) {
    const idAlquiler = comandoFacturarAlquiler.idAlquiler;
    await this.servicioFacturarAlquiler.facturarAlquiler(idAlquiler);
  }
}
