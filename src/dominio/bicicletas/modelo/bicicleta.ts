import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';

export class Bicicleta {
  readonly #marca: string;
  readonly #serial: string;
  readonly #color: string;
  readonly #almacenActual: string;
  readonly #fechaCompra: Date;
  readonly #estado: string;
  readonly #valorHora: number;
  readonly #descripcion: string;

  constructor(bicicletaDto: BicicletaDto) {
    this.#marca = bicicletaDto.marca;
    this.#serial = bicicletaDto.serial;
    this.#color = bicicletaDto.color;
    this.#almacenActual = bicicletaDto.almacenActual;
    this.#fechaCompra = new Date(bicicletaDto.fechaCompra);
    this.#estado = bicicletaDto.estado;
    this.#valorHora = bicicletaDto.valorHora;
    this.#descripcion = bicicletaDto.descripcion;
  }

  get marca(): string {
    return this.#marca;
  }

  get serial(): string {
    return this.#serial;
  }

  get color(): string {
    return this.#color;
  }

  get almacenActual(): string {
    return this.#almacenActual;
  }

  get fechaCompra(): Date {
    return this.#fechaCompra;
  }

  get estado(): string {
    return this.#estado;
  }

  get valorHora(): number {
    return this.#valorHora;
  }

  get descripcion(): string {
    return this.#descripcion;
  }
}
