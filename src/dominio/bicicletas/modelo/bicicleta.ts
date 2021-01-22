import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { ErrorValorHoraInvalido } from 'src/dominio/errores/error-valor-hora-invalido';

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
    this.validarValorHora(bicicletaDto.valorHora);
    this.#marca = bicicletaDto.marca;
    this.#serial = bicicletaDto.serial;
    this.#color = bicicletaDto.color;
    this.#almacenActual = bicicletaDto.almacenActual;
    this.#fechaCompra = new Date(bicicletaDto.fechaCompra);
    this.#estado = bicicletaDto.estado;
    this.#valorHora = bicicletaDto.valorHora;
    this.#descripcion = bicicletaDto.descripcion;
  }

  private validarValorHora(valor: number) {
    const minimoValor = 1000;
    let mensaje = `Valor Hora: ${valor} debe ser superior a ${minimoValor} COP`;
    if (valor <= minimoValor ) {
      throw new ErrorValorHoraInvalido(mensaje);
    }
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
