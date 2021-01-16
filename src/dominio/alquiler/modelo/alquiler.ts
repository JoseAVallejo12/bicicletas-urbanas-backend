import { ErrorCiudadNoDisponible } from 'src/dominio/errores/error-ciudad-no-disponible';
import { ErrorHorarioNoPermitido } from 'src/dominio/errores/error-horario-no-permitido';
import { AlquilerDto } from '../../../aplicacion/alquiler/consulta/dto/alquiler.dto';

const CIUDADES_DISPONIBLES = ['barranquilla'];

export class Alquiler {
  readonly #cedulaUsuario: string;
  readonly #serialBicicleta: string;
  readonly #fechaAlquiler: Date;
  readonly #ciudad: string;
  readonly #estado: boolean;


  constructor(alquilerDto: AlquilerDto) {
    this.validarCiudad(alquilerDto.ciudad);
    this.#fechaAlquiler = new Date(alquilerDto.fechaAlquiler);
    this.validarFecha(this.fechaAlquiler);
    this.#serialBicicleta = alquilerDto.serialBicicleta;
    this.#cedulaUsuario = alquilerDto.cedulaUsuario;
    this.#ciudad = alquilerDto.ciudad;
    this.#estado = alquilerDto.estado;
  }

  private validarCiudad(ciudad: string) {
    if (!CIUDADES_DISPONIBLES.some((value) => value === ciudad)){
      throw new ErrorCiudadNoDisponible('Ciudad No Disponible por el momento');
    }
  }

  private validarFecha(fecha: Date){
    const horaIn = 7;
    const horaOut = 22;
    const corteString = 2;
    const hora = parseInt(fecha.toTimeString().slice(0, corteString), 10);
    if (hora < horaIn || hora >= horaOut) {
      throw new ErrorHorarioNoPermitido('Horario fuera de rango: 7 to 22 horas');
    }
  }


  get cedulaUsuario(): string {
    return this.#cedulaUsuario;
  }

  get serialBicicleta(): string {
    return this.#serialBicicleta;
  }

  get fechaAlquiler(): Date {
    return this.#fechaAlquiler;
  }

  get ciudad(): string {
    return this.#ciudad;
  }

  get estado(): boolean {
    return this.#estado;
  }
}
