import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorUsuarioNoEncontrado extends ErrorDeNegocio {
  /**
   * Error se levanta cuando se le desea aasignar una segunda bici al mismo usuario
   * @param mensaje mensaje enviado desde donde se alzó el evento
   */
  constructor(mensaje: string) {
    super(mensaje, ErrorUsuarioNoEncontrado.name);
  }
}
