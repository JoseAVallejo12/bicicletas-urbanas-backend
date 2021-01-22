import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorBicicletaNoDisponible extends ErrorDeNegocio {
  /**
   * Error levantado al registar una ciudad no disponible para alquilar bicis
   * @param mensaje enviado desde donde se alzó el evento
   */
  constructor(mensaje: string) {
    super(mensaje, ErrorBicicletaNoDisponible.name);
  }
}
