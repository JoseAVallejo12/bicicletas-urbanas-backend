import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { Bicicleta } from 'src/dominio/bicicletas/modelo/bicicleta';


describe('Bicicleta test', () => {

  const _Bicicleta = Bicicleta;

  it('Crear una nueva bicicleta', () => {
    const biciData: BicicletaDto = {
      marca: 'Jeep',
      serial: 'BALTORO 29 V20',
      color: 'Roja',
      almacenActual: '2',
      fechaCompra: new Date().toISOString(),
      estado: 'alquilada',
      valorHora: 6890,
      descripcion: 'Vel molestias quos.'
    };

    const bicicleta = new _Bicicleta(biciData);
    expect(bicicleta.marca).toEqual(biciData.marca);
    expect(bicicleta.serial).toEqual(biciData.serial);
    expect(bicicleta.color).toEqual(biciData.color);
    expect(bicicleta.fechaCompra.toISOString()).toEqual(biciData.fechaCompra);
    expect(bicicleta.valorHora).toEqual(biciData.valorHora);
  });

  it('falla por valor hora inferior a 1000 COP', () => {
    const biciData2: BicicletaDto = {
      marca: 'Jeep',
      serial: 'BALTORO 29 V20',
      color: 'Roja',
      almacenActual: '2',
      fechaCompra: new Date().toISOString(),
      estado: 'alquilada',
      valorHora: 99,
      descripcion: 'Vel molestias quos.'
    };
    expect(()=>{
      return new _Bicicleta(biciData2);
    }).toThrowError();
  });


});
