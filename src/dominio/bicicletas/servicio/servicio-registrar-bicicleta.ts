import { Bicicleta } from '../modelo/bicicleta';
import { RepositorioBicicleta } from '../puerto/repositorio/repositorio-bicicleta';

export class ServicioRegistrarBicicleta {

  constructor(private readonly repositorioBicicleta: RepositorioBicicleta) {
  }

  async ejecutar(bicicleta: Bicicleta) {
    this.repositorioBicicleta.guardar(bicicleta);
  }
}
