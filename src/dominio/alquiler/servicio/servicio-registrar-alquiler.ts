import { string } from '@hapi/joi';
import { ErrorBicicletaNoDisponible } from 'src/dominio/errores/error-bicicleta-no-disponible';
import { ErrorBicicletaNoEncontrada } from 'src/dominio/errores/error-id-bicicleta';
import { ErrorUsuarioConAlquilerActivo } from 'src/dominio/errores/error-usuario-alquiler';
import { ErrorUsuarioNoEncontrado } from 'src/dominio/errores/error-usuario-no-encontrado';
import { Alquiler } from '../modelo/alquiler';
import { RepositorioAlquiler } from '../puerto/repositorio/repositorio-alquiler';

export class ServicioRegistraAlquiler {
  #mensaje: string;

  constructor(
    private repositorioAlquiler: RepositorioAlquiler
    ) { this.#mensaje = ''; }

    async guardar(alquiler: Alquiler) {
      if (!await this.repositorioAlquiler.existeUsuario(alquiler.cedulaUsuario.toString())) {
        this.#mensaje = `Usuario con Cedula: ${alquiler.cedulaUsuario} no registrado en sistema`;
        throw new ErrorUsuarioNoEncontrado(this.#mensaje);

      } else if (!await this.repositorioAlquiler.existeBicicleta(alquiler.idBicicleta.toString())) {
        this.#mensaje = `Bicicleta con Id: ${alquiler.idBicicleta} no registrada en sistema`;
        throw new ErrorBicicletaNoEncontrada(this.#mensaje);

      } else if (await this.repositorioAlquiler.usuarioHabilitado(alquiler.cedulaUsuario.toString())) {
        this.#mensaje = `Usuario con Cedula: ${alquiler.cedulaUsuario} ya tiene una bicicleta asignada`;
        throw new ErrorUsuarioConAlquilerActivo(this.#mensaje);

      } else if (!await this.repositorioAlquiler.bicicletaLibre(alquiler.idBicicleta.toString())) {
        this.#mensaje = `Bicicleta con Id: ${alquiler.idBicicleta} no disponible`;
        throw new ErrorBicicletaNoDisponible(this.#mensaje);

      } else {
        this.repositorioAlquiler.guardar(alquiler);
        this.repositorioAlquiler.actualizarEstadoBicicleta(alquiler.idBicicleta.toString());
      }
    }
}
