import { FacturacionDto } from 'src/aplicacion/alquiler/consulta/dto/facturar.dto';
import { ErrorValorHoraInvalido } from 'src/dominio/errores/error-valor-hora-invalido';

export class Facturacion {
  readonly #idAlquiler: string;
  readonly #fechaInicio: Date;
  readonly #fechaEntrega: Date;
  readonly #valorHora: number;
  readonly #totalHoras: number;
  readonly #total: number;

  constructor(facturacionDto: FacturacionDto) {
    this.#idAlquiler = facturacionDto.idAlquiler;
    this.#fechaInicio = new Date(facturacionDto.fechaInicio);
    this.#fechaEntrega = new Date(facturacionDto.fechaEntrega);
    this.#valorHora = this.validarValorHora(facturacionDto.valorHora);
    this.#totalHoras = this.horasTrasncurridas();
    this.#total = this.facturar();
  }

  private validarValorHora(valor: string): number {
    const valorMin = 1000;
    const valorInt = parseInt(valor, 10);
    const mensaje = `Valor: ${valor} no valido para facturar`;
    if (valorInt <= valorMin ) {
      throw new ErrorValorHoraInvalido(mensaje);
    }
    return valorInt;
  }

  private facturar(): number {
    let horas = 1;
    if (this.#totalHoras !== 0) {
      horas = this.#totalHoras;
    }
    return (this.#valorHora * horas) * this.aplicarDescuento(horas);
  }

  private horasTrasncurridas(): number {
    const msToSeg = 1000;
    const segToMin = 60;
    const minToHr = 60;
    let milisegundos = this.#fechaEntrega.getTime() - this.#fechaInicio.getTime();
    return (Math.round(milisegundos/ (msToSeg * segToMin * minToHr)));
  }

  private aplicarDescuento(tiempo: number): number {
    return 1;
  }

  get idAlquiler(): string {
    return this.#idAlquiler;
  }

  get fechaInicio(): Date {
    return this.#fechaInicio;
  }

  get fechaEntrega(): Date {
    return this.#fechaEntrega;
  }

  get valorHora(): number {
    return this.#valorHora;
  }

  get totalHoras(): number {
    return this.#totalHoras;
  }

  get total() {
    return this.#total;
  }

}
