import { ErrorBicicletaNoEncontrada } from 'src/dominio/errores/error-id-bicicleta';
import { RepositorioBicicleta } from '../puerto/repositorio/repositorio-bicicleta';

export class ServicioActualizarBicicleta {

  constructor(private repositiorioBicicleta: RepositorioBicicleta) {}

  async actualizarBicicleta(estado: string, id: string) {
    const mensaje = `Bicicleta Id: ${id} no encontrada`;
    const idBicicleta = parseInt(id, 10);
    if (!await this.repositiorioBicicleta.existeIdBicicleta(idBicicleta)) {
      throw new ErrorBicicletaNoEncontrada(mensaje);
    }
    this.repositiorioBicicleta.actualizar(estado, id);
  }

}
