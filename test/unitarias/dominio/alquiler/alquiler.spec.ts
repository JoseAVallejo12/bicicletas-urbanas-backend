import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';

describe('Alquiler', () => {
  const _alquiler = Alquiler;
  let alquilerData: AlquilerDto;

  beforeEach(() =>{
    alquilerData = {
      cedulaUsuario: '43343567',
      idBicicleta: '335',
      ciudad: 'barranquilla',
      estado: true,
      fechaAlquiler: '2020-09-20 20:57:07'
    };
    return alquilerData;
  });

  it('crear un nuevo alquiler', () => {
    const alquiler = new _alquiler(alquilerData);
    const corteString = 8;
    expect(alquiler.ciudad).toEqual('barranquilla');
    expect(alquiler.fechaAlquiler.toTimeString().slice(0, corteString))
      .toEqual(alquilerData.fechaAlquiler.split(' ')[1]);
    expect(alquiler.cedulaUsuario).toBe(parseInt(alquilerData.cedulaUsuario, 10));
  });

  it('Crear alquiler ciudad no habiliatda', () => {
    alquilerData.ciudad = 'cali';
    alquilerData.fechaAlquiler = '2020-09-20 20:57:07';
    expect(() => {
      return new _alquiler(alquilerData);
    }).toThrowError();
  });

  it('Crear alquiler fuera de horario 07 to 22h', ()=> {
    alquilerData.fechaAlquiler = '2020-09-20 06:59:07';
    expect(()=>{
      return new _alquiler(alquilerData);
    }).toThrowError();
  });

});
