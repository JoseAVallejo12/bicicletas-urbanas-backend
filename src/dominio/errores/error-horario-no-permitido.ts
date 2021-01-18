import { ErrorDeNegocio } from './error-de-negocio';


export class ErrorHorarioNoPermitido extends ErrorDeNegocio {
  /**
   * Error levantado al registrar alquiler fuera de horario permitido
   * @param mensaje enviado desde donde se levanta el error
   */
  constructor(mensaje: string) {
    super(mensaje, ErrorHorarioNoPermitido.name);
  }
}
