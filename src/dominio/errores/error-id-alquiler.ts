import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorAlquilerSinFacturaNoEncontrado extends ErrorDeNegocio {
  /**
   * Al registrar un alquiler se verifica que el Id sea unico
   * @param mensaje mensaje enviado desde donde se alzó el evento
   */
  constructor(mensaje: string) {
    super(mensaje, ErrorAlquilerSinFacturaNoEncontrado.name);
  }
}
