import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

export class Usuario {
  readonly #nombre: string;
  readonly #apellido: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;
  readonly #cedula: number;
  readonly #correo: string;
  readonly #telefono: string;
  readonly #direccion: string;

  constructor(usuarioDto: UsuarioDto) {
    this.#nombre = usuarioDto.nombre;
    this.#clave = usuarioDto.clave;
    this.#fechaCreacion = new Date(usuarioDto.fechaCreacion);
    this.#cedula = parseInt(usuarioDto.cedula, 10);
    this.#correo = usuarioDto.correo;
    this.#telefono = usuarioDto.telefono;
    this.#direccion = usuarioDto.direccion;
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

  get cedula(): number {
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
