import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';
import { Usuario } from '../modelo/usuario';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';


export class ServicioRegistrarUsuario {

  constructor(private readonly _repositorioUsuario: RepositorioUsuario) {
  }

  async ejecutar(usuario: Usuario) {
    if (await this._repositorioUsuario.existeCedulaUsuario(usuario.cedula)) {
      throw new ErrorDeNegocio(
        `El Usuario con cedula numero: ${usuario.cedula} ya existe`,
      );
    }
    this._repositorioUsuario.guardar(usuario);
  }
}
