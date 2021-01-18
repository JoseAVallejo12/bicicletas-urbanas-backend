import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorValorHoraInvalido extends ErrorDeNegocio {
  /**
   * Error levantado al registar un valor por hora no permitido
   * @param mensaje enviado desde donde se alzó el evento
   */
  constructor(mensaje: string) {
    super(mensaje, ErrorValorHoraInvalido.name);
  }
}
