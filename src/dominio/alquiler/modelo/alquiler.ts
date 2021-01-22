import { ErrorCiudadNoDisponible } from 'src/dominio/errores/error-ciudad-no-disponible';
import { ErrorHorarioNoPermitido } from 'src/dominio/errores/error-horario-no-permitido';
import { AlquilerDto } from '../../../aplicacion/alquiler/consulta/dto/alquiler.dto';

const CIUDADES_DISPONIBLES = ['barranquilla'];

export class Alquiler {
  readonly #cedulaUsuario: number;
  readonly #idBicicleta: number;
  readonly #fechaAlquiler: Date;
  readonly #ciudad: string;
  readonly #estado: boolean;


  constructor(alquilerDto: AlquilerDto) {
    this.validarCiudad(alquilerDto.ciudad);
    this.#fechaAlquiler = new Date(alquilerDto.fechaAlquiler);
    this.validarFecha(this.fechaAlquiler);
    this.#idBicicleta = parseInt(alquilerDto.idBicicleta, 10);
    this.#cedulaUsuario = parseInt(alquilerDto.cedulaUsuario, 10);
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

  get cedulaUsuario(): number {
    return this.#cedulaUsuario;
  }

  get idBicicleta(): number {
    return this.#idBicicleta;
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
