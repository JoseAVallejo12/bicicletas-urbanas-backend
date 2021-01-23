import { string } from '@hapi/joi';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ErrorBicicletaNoDisponible } from 'src/dominio/errores/error-bicicleta-no-disponible';
import { ErrorBicicletaNoEncontrada } from 'src/dominio/errores/error-id-bicicleta';
import { ErrorUsuarioConAlquilerActivo } from 'src/dominio/errores/error-usuario-alquiler';
import { ErrorUsuarioNoEncontrado } from 'src/dominio/errores/error-usuario-no-encontrado';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Alquiler } from '../modelo/alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioRegistraAlquiler {
  #mensaje: string;

  constructor(
    private repositorioAlquiler: RepositorioAlquiler,
    private repositorioBicicleta: RepositorioBicicleta,
    private repositorioUsuario: RepositorioUsuario
    ) { this.#mensaje = ''; }

    async guardar(alquiler: Alquiler) {
      if (!await this.repositorioUsuario.existeCedulaUsuario(alquiler.cedulaUsuario)) {
        this.#mensaje = `Usuario con Cedula: ${alquiler.cedulaUsuario} no registrado en sistema`;
        throw new ErrorUsuarioNoEncontrado(this.#mensaje);

      } else if (!await this.repositorioBicicleta.existeBicicleta(alquiler.idBicicleta)) {
        this.#mensaje = `Bicicleta con Id: ${alquiler.idBicicleta} no registrada en sistema`;
        throw new ErrorBicicletaNoEncontrada(this.#mensaje);

      } else if (!await  this.repositorioUsuario.usuarioHabilitado(alquiler.cedulaUsuario)) {
        this.#mensaje = `Usuario con Cedula: ${alquiler.cedulaUsuario} ya tiene una bicicleta asignada`;
        throw new ErrorUsuarioConAlquilerActivo(this.#mensaje);

      } else if (!await this.repositorioBicicleta.bicicletaHabilitada(alquiler.idBicicleta)) {
        this.#mensaje = `Bicicleta con Id: ${alquiler.idBicicleta} no disponible`;
        throw new ErrorBicicletaNoDisponible(this.#mensaje);

      } else {
        this.repositorioAlquiler.guardar(alquiler);
        this.repositorioBicicleta.actualizarEstado(alquiler.idBicicleta, 'alquilada');
        this.repositorioUsuario.actualizarEstado(alquiler.cedulaUsuario, false);
      }
    }
}
