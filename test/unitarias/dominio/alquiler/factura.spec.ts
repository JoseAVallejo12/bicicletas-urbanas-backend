import { Facturacion } from 'src/dominio/alquiler/modelo/facturar';
import { FacturacionDto } from 'src/dominio/alquiler/puerto/dto/facturar.dto';

describe('Factura', () => {
  const facturacion = Facturacion;
  let facturaData: FacturacionDto;

  it('Deberia crear facturacion para dos horas diurnas sin descuento', () => {
    facturaData = {
      idAlquiler: 4,
      valorHora: 10000,
      fechaInicio: new Date('2021-01-20 08:00:00'),
      fechaEntrega: new Date('2021-01-20 10:00:00'),
    };
    const totalHorasDeAlquiler = 2;
    const horasAntesDe7pm = 2;

    const total = (horasAntesDe7pm * facturaData.valorHora);

    const nuevaFacturacion = new facturacion(facturaData);
    expect(nuevaFacturacion.totalHoras).toEqual(totalHorasDeAlquiler);
    expect(nuevaFacturacion.total).toEqual(total);

  });

  it('Deberia crear facturacion para 14 horas en semana', () => {
    facturaData = {
      idAlquiler: 4,
      valorHora: 10000,
      fechaInicio: new Date('2021-01-25 07:02:00'),
      fechaEntrega: new Date('2021-01-25 22:00:00'),
    };

    const totalHorasDeAlquiler = 15;
    const horasAntesDe7pm = 12;
    const horasDespuesDe7pm = 3;
    const incrementoNocturno = 0.1; // +10% despues de lunes a viernes despues de 7pm
    const descuento = 0.7; // -30% por mas de 10 y menos de 15 horas
    const incrementoValorHora = facturaData.valorHora + (facturaData.valorHora * incrementoNocturno);

    const total = (
      ((horasAntesDe7pm * facturaData.valorHora) + (horasDespuesDe7pm * incrementoValorHora)) * descuento
    );

    const nuevaFacturacion = new facturacion(facturaData);
    expect(nuevaFacturacion.totalHoras).toEqual(totalHorasDeAlquiler);
    expect(nuevaFacturacion.total).toEqual(total);

  });

  it('Deberia crear facturacion para mas de 14 horas aplicando -40%', () => {

    facturaData = {
      idAlquiler: 4,
      valorHora: 10000,
      fechaInicio: new Date('2021-01-25 07:00:00'),
      fechaEntrega: new Date('2021-01-28 22:00:00'),
    };

    const milisegundos = 1000;
    const minutos = 60;
    const horas = 60;
    const tiempoEnMilisegundos = facturaData.fechaEntrega.getTime() - facturaData.fechaInicio.getTime();
    const totalHoras = (Math.round(tiempoEnMilisegundos / (milisegundos * minutos * horas)));
    const descuento = 0.6; // -40% para mas de 15 horas de alquiler
    const incremento = 0.2; // +20%, aplica para fines de semana y alquilere por mas de 14horas
    const nuevoValor = facturaData.valorHora + (facturaData.valorHora * incremento);

    const nuevaFacturacion = new facturacion(facturaData);

    expect(nuevaFacturacion.total).toEqual(nuevoValor * totalHoras * descuento);

  });
})
