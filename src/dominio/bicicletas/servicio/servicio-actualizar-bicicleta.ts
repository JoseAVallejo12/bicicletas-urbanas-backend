import { ErrorBicicletaNoEncontrada } from 'src/dominio/errores/error-id-bicicleta';
import { RepositorioBicicleta } from '../puerto/repositorio/repositorio-bicicleta';

export class ServicioActualizarBicicleta {

  constructor(private repositiorioBicicleta: RepositorioBicicleta) {}

  async actualizarBicicleta(estado: string, id: string) {
    const mensaje = `Bicicleta Id: ${id} no encontrada`;
    if (!await this.repositiorioBicicleta.existeIdBicicleta(id)) {
      throw new ErrorBicicletaNoEncontrada(mensaje);
    }
    this.repositiorioBicicleta.actualizar(estado, id);
  }

}
