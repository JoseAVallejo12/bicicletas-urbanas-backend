import { FacturacionDto } from 'src/dominio/alquiler/puerto/dto/facturar.dto';
import { ErrorValorHoraInvalido } from 'src/dominio/errores/error-valor-hora-invalido';

export class Facturacion {
  readonly #idAlquiler: number;
  readonly #fechaInicio: Date;
  readonly #fechaEntrega: Date;
  readonly #valorHora: number;
  readonly #totalHoras: number;
  readonly #total: number;
  readonly #horaInicio: number;
  readonly #horaEntrega: number;
  readonly #diaSemana: number;

  constructor(facturacionDto: FacturacionDto) {
    this.#idAlquiler = facturacionDto.idAlquiler;
    this.#fechaInicio = facturacionDto.fechaInicio;
    this.#fechaEntrega = facturacionDto.fechaEntrega;
    this.#horaInicio = this.#fechaInicio.getHours();
    this.#horaEntrega = this.#fechaEntrega.getHours();
    this.#diaSemana = this.fechaEntrega.getDay();
    this.#valorHora = this.validarValor(facturacionDto.valorHora);
    this.#totalHoras = this.horasTrasncurridas();
    this.#total = this.facturar(this.#horaInicio, this.#horaEntrega, this.#diaSemana);
  }

  private validarValor(valor: number): number {
    const valorMin = 1000;
    const mensaje = `Valor: ${valor} no valido para facturar`;
    if (valor <= valorMin) {
      throw new ErrorValorHoraInvalido(mensaje);
    }
    return valor;
  }

  private facturar(horaInicio: number, horaEntrega: number, diaSemana: number): number {

    const horaDeReferencia = 19;
    const maxHorasPorDia = 15;
    let horasNomales = 0;
    let horasExtras = 0;
    let subTotal: number;
    const sabado = 6;
    const domingo = 0;
    const incrementoGenerales = 0.2; // +20% fines de semanas y por mas de 15horas de alquiler
    const incrementoHorarioNocturno = 0.1; // +10% en horas despues de 7pm lunes - viernes
    const incrementoFinDeSeman = this.#valorHora + (this.#valorHora * incrementoGenerales);
    const incrementoNocturno = this.#valorHora + (this.#valorHora * incrementoHorarioNocturno);

    // Totalizacion de horas antes y despues de 7pm solo en dias de semana
    if (horaInicio < horaDeReferencia && horaEntrega > horaDeReferencia ) {
      horasNomales = horaDeReferencia - horaInicio;
      horasExtras = this.#totalHoras - horasNomales;

    } else if (horaInicio < horaDeReferencia && horaEntrega < horaDeReferencia ) {
      horasNomales = this.#totalHoras;

    } else if (horaInicio > horaDeReferencia && horaEntrega > horaDeReferencia ) {
      horasExtras = this.#totalHoras;
    }

    // Validacion de fin de semana para incremento adicional
    if (diaSemana === domingo || diaSemana === sabado || this.#totalHoras > maxHorasPorDia) {
      subTotal = this.#totalHoras * incrementoFinDeSeman;
    } else {
      subTotal = ((horasNomales * this.#valorHora) + (horasExtras * incrementoNocturno));
    }

    // Aplicar descuento al total, segun el numero de horas del alquiler
    return (subTotal * this.aplicarDescuento(this.#totalHoras));
  }

  private horasTrasncurridas(): number {
    const milisegundos = 1000;
    const minutos = 60;
    const horas = 60;
    let tiempoEnMilisegundos = this.#fechaEntrega.getTime() - this.#fechaInicio.getTime();
    return (Math.round(tiempoEnMilisegundos / (milisegundos * minutos * horas)));
  }

  private aplicarDescuento(tiempo: number): number {
    let tarifa = 1;
    const descuento = {
      uno: { minHora: 3, maxHora: 6, factor: 0.9 },
      dos: { minHora: 7, maxHora: 10, factor: 0.8 },
      tres: { minHora: 11, maxHora: 15, factor: 0.7 },
      cuatro: { minHora: 16, factor: 0.6 }
    };

    if (tiempo >= descuento.uno.minHora && tiempo <= descuento.uno.maxHora) {
      tarifa = descuento.uno.factor;
    } else if (tiempo >= descuento.dos.minHora && tiempo <= descuento.dos.maxHora) {
      tarifa = descuento.dos.factor;
    } else if (tiempo >= descuento.tres.minHora && tiempo <= descuento.tres.maxHora) {
      tarifa = descuento.tres.factor;
    } else if (tiempo >= descuento.cuatro.minHora) {
      tarifa = descuento.cuatro.factor;
    }
    return tarifa;
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
