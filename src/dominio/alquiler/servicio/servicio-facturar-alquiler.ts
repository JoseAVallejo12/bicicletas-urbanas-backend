import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ErrorAlquilerNoEncontrado } from 'src/dominio/errores/error-id-alquiler';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Facturacion } from '../modelo/facturar';
import { DaoAlquiler } from '../puerto/dao/dao-alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioFacturarAlquiler {
  #mensaje: string;

  constructor(
    private repositorioAlquiler: RepositorioAlquiler,
    private repositorioBicicleta: RepositorioBicicleta,
    private repositorioUsuario: RepositorioUsuario
    ) { this.#mensaje = ''; }

  async facturarAlquiler(idAlquiler: string) {
    this.#mensaje = `Alquiler con ID ${idAlquiler} no encontrado`;
    if (!await this.repositorioAlquiler.existeAlquiler(idAlquiler)) {
      throw new ErrorAlquilerNoEncontrado(this.#mensaje);
    }
    const alquilerInfo = await this.repositorioAlquiler.buscarAlquiler(idAlquiler);
    const valor = await this.repositorioBicicleta.obtenerValorHora(alquilerInfo.idBicicleta);
    this.repositorioAlquiler.actualizar( new Facturacion({
        idAlquiler: alquilerInfo.idBicicleta,
        valorHora: valor,
        fechaInicio: alquilerInfo.fechaAlquiler,
        fechaEntrega: new Date()
    }));
    this.repositorioUsuario.actualizarEstado(alquilerInfo.cedulaUsuario, true);
    this.repositorioBicicleta.actualizarEstado(alquilerInfo.idBicicleta, 'libre');
  }

}
