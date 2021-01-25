import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ErrorAlquilerSinFacturaNoEncontrado } from 'src/dominio/errores/error-id-alquiler';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Facturacion } from '../modelo/facturar';
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
    if (!await this.repositorioAlquiler.existeAlquilerSinFacturar(idAlquiler)) {
      throw new ErrorAlquilerSinFacturaNoEncontrado(this.#mensaje);
    }

    const alquilerInfo = await this.repositorioAlquiler.buscarAlquiler(idAlquiler);
    const valor = await this.repositorioBicicleta.obtenerValorHora(alquilerInfo.idBicicleta);

    const facturacion = new Facturacion({
      idAlquiler: parseInt(idAlquiler, 10),
      valorHora: valor,
      fechaInicio: alquilerInfo.fechaAlquiler,
      fechaEntrega: new Date()
    });

    this.repositorioAlquiler.actualizar(facturacion);
    this.repositorioUsuario.actualizarEstado(alquilerInfo.cedulaUsuario, true);
    this.repositorioBicicleta.actualizarEstado(alquilerInfo.idBicicleta, 'libre');
  }

}
