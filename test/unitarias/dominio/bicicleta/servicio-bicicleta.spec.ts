import { SinonStubbedInstance } from 'sinon';
import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { Bicicleta } from 'src/dominio/bicicletas/modelo/bicicleta';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioRegistrarBicicleta', () => {
  let servicioRegistrarBicicleta: ServicioRegistrarBicicleta;
  let repositorioBicicletaStub: SinonStubbedInstance<RepositorioBicicleta>;
  let bicicletaData: BicicletaDto;

  beforeEach(() => {
    repositorioBicicletaStub = createStubObj<RepositorioBicicleta>([
      'existeIdBicicleta',
      'actualizar',
      'guardar'
    ]);
    servicioRegistrarBicicleta = new ServicioRegistrarBicicleta(repositorioBicicletaStub);
    bicicletaData = {
      marca: 'Jeep',
      serial: 'BALTORO 29 V20',
      color: 'Roja',
      almacenActual: '2',
      fechaCompra: new Date().toISOString(),
      estado: 'alquilada',
      valorHora: 6890,
      descripcion: 'Vel molestias quos.'
    };
    return bicicletaData;
  });

  it('Registrar una nueva bicicleta', async () => {
    const bicicleta = new Bicicleta(bicicletaData);
    await servicioRegistrarBicicleta.ejecutar(bicicleta);

    expect(repositorioBicicletaStub.guardar.getCalls().length).toBe(1);
    expect(repositorioBicicletaStub.guardar.calledWith(bicicleta)).toBeTruthy();
  });

})
