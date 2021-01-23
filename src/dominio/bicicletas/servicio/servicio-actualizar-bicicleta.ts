import { ErrorBicicletaNoEncontrada } from 'src/dominio/errores/error-id-bicicleta';
import { RepositorioBicicleta } from '../puerto/repositorio/repositorio-bicicleta';

export class ServicioActualizarBicicleta {

  constructor(private repositiorioBicicleta: RepositorioBicicleta) {}

  async actualizarBicicleta(estado: string, id: string) {

    const mensaje = `Bicicleta Id: ${id} no encontrada`;
    const idBicicleta = parseInt(id, 10);

    if (!await this.repositiorioBicicleta.existeBicicleta(idBicicleta)) {
      throw new ErrorBicicletaNoEncontrada(mensaje);
    }
    this.repositiorioBicicleta.actualizarEstado(idBicicleta, 'libre');
  }

}
