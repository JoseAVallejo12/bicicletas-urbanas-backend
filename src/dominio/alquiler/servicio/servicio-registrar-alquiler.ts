import { ErrorUsusarioAlquiler } from 'src/dominio/errores/error-usuario-alquiler';
import { ErrorIdAlquilerDuplicado } from 'src/dominio/errores/error-id-alquiler';
import { Alquiler } from '../modelo/alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioRegistraAlquiler {
  /**
   * verificar si cedula user tiene ya asiganada una bicicleta
   * guardar alquiler en db
   */
  constructor(private repositorioAlquiler: RepositorioAlquiler) {}

    async actualizarEstado(estado: boolean, id: string) {
      if (this.repositorioAlquiler.existeIdAlquiler(id)){
        throw new ErrorIdAlquilerDuplicado(`Alquiler Id: ${id} no encontrado`);
      } else {
        this.repositorioAlquiler.actualizarEstado(estado, id);
      }
    }

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
