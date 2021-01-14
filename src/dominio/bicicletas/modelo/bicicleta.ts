import { BicicletaDto } from 'src/aplicacion/bicicletas/dto/bicicletas.dto';

export class Bicicleta {
  readonly #marca: string;
  readonly #serial: string;
  readonly #color: string;
  readonly #almacenActual: string;
  readonly #estado: string;
  readonly #valorHora: number;

  constructor(bicicletaDto: BicicletaDto) {
    this.#marca = bicicletaDto.marca;
    this.#serial = bicicletaDto.serial;
    this.#color = bicicletaDto.color;
    this.#almacenActual = bicicletaDto.almacenActual;
    this.#estado = bicicletaDto.estado;
    this.#valorHora = bicicletaDto.valorHora;
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

  get estado(): string {
    return this.#estado;
  }

  get valorHora(): number {
    return this.#valorHora;
  }
}
