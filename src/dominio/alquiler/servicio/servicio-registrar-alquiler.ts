import { ErrorUsusarioAlquiler } from 'src/dominio/errores/error-usuario-alquiler';
import { ErrorAlquilerNoEncontrado } from 'src/dominio/errores/error-id-alquiler';
import { Alquiler } from '../modelo/alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioRegistraAlquiler {

  constructor(private repositorioAlquiler: RepositorioAlquiler) {}

    async guardar(alquiler: Alquiler) {
      if (await this.repositorioAlquiler.existeCedulaUsuario(alquiler.cedulaUsuario)){
        throw new ErrorUsusarioAlquiler(
          `Usuario con Cedula: ${alquiler.cedulaUsuario} ya tiene una bicicleta asignada`
          );
      } else {
        this.repositorioAlquiler.guardar(alquiler);
      }
    }
}
