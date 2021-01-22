import { ErrorAlquilerNoEncontrado } from 'src/dominio/errores/error-id-alquiler';
import { Facturacion } from '../modelo/facturar';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioFacturarAlquiler {

  constructor(
    private repositorioAlquiler: RepositorioAlquiler) {}

  async actualizarAlquiler(facturacion: Facturacion) {
    const mensaje = `Alquiler Id: ${facturacion.idAlquiler} no encontrado`;
    if (!await this.repositorioAlquiler.existeAlquiler(facturacion.idAlquiler)) {
      throw new ErrorAlquilerNoEncontrado(mensaje);
    }
    this.repositorioAlquiler.actualizar(facturacion);
  }

}
