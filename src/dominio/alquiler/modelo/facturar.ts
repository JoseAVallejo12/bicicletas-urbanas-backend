import { FacturacionDto } from 'src/dominio/alquiler/puerto/dto/facturar.dto';
import { ErrorValorHoraInvalido } from 'src/dominio/errores/error-valor-hora-invalido';

export class Facturacion {
  readonly #idAlquiler: number;
  readonly #fechaInicio: Date;
  readonly #fechaEntrega: Date;
  readonly #valorHora: number;
  readonly #totalHoras: number;
  readonly #total: number;

  constructor(facturacionDto: FacturacionDto) {
    this.#idAlquiler = facturacionDto.idAlquiler;
    this.#fechaInicio = facturacionDto.fechaInicio;
    this.#fechaEntrega = facturacionDto.fechaEntrega;
    this.#valorHora = this.validarValor(facturacionDto.valorHora);
    this.#totalHoras = this.horasTrasncurridas();
    this.#total = this.facturar();
  }

  private validarValor(valor: number): number {
    const valorMin = 1000;
    const mensaje = `Valor: ${valor} no valido para facturar`;
    if (valor <= valorMin) {
      throw new ErrorValorHoraInvalido(mensaje);
    }
    return valor;
  }

  private facturar(): number {
    let horas = 1;
    if (this.#totalHoras !== 0) {
      horas = this.#totalHoras;
    }
    return (this.#valorHora * horas) * this.aplicarDescuento(horas);
  }

  private horasTrasncurridas(): number {
    const milisegundos = 1000;
    const minutos = 60;
    const horas = 60;
    let tiempoEnMilisegundos = this.#fechaEntrega.getTime() - this.#fechaInicio.getTime();
    return (Math.round(tiempoEnMilisegundos / (milisegundos * minutos * horas)));
  }

  private aplicarDescuento(tiempo: number): number {
    return 1;
  }

  get idAlquiler(): number {
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
