import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;
export class Usuario {
  readonly #nombre: string;
  readonly #apellido: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;
  readonly #cedula: string;
  readonly #correo: string;
  readonly #telefono: string;
  readonly #direccion: string;

  constructor(usuarioDto: UsuarioDto) {
    this.validarTamanoClave(usuarioDto.clave);
    this.#nombre = usuarioDto.nombre;
    this.#clave = usuarioDto.clave;
    this.#fechaCreacion = new Date(usuarioDto.fechaCreacion);
    this.#cedula = usuarioDto.cedula;
    this.#correo = usuarioDto.correo;
    this.#telefono = usuarioDto.telefono;
    this.#direccion = usuarioDto.direccion;
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }
  }

  get nombre(): string {
    return this.#nombre;
  }

  get apellido(): string {
    return this.#apellido;
  }

  get clave(): string {
    return this.#clave;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }

  get cedula(): string {
    return this.#cedula;
  }

  get correo(): string {
    return this.#correo;
  }

  get telefono(): string {
    return this.#telefono;
  }

  get direccion(): string {
    return this.#direccion;
  }
}
