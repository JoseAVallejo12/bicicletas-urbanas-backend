import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Alquiler } from '../modelo/alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioRegistraAlquiler {
  /**
   * verificar si cedula user tiene ya asiganada una bicicleta
   * guardar alquiler en db
   */
  constructor(private repositorioAlquiler: RepositorioAlquiler) {}

    async actualizarEstado(estado: string, id: string) {
      if (this.repositorioAlquiler.existeIdAlquiler(id)){
        throw new Error(`Alquiler Id: ${id} no encontrado`);
      } else {
        this.repositorioAlquiler.actualizarEstado(estado);
      }
    }

    async guardar(alquiler: Alquiler) {
      if (this.repositorioAlquiler.existeCedulaUsuario(alquiler.cedulaUsuario)){
        throw new Error(`Usuario con Cedula: ${alquiler.cedulaUsuario} ya tiene una bicicleta asignada`);
      } else {
        this.repositorioAlquiler.guardar(alquiler);
      }
    }
}
