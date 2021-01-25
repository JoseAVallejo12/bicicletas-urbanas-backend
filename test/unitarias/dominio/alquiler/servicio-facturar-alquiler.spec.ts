import { SinonStubbedInstance } from 'sinon';
import { FacturacionDto } from 'src/dominio/alquiler/puerto/dto/facturar.dto';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { createStubObj } from 'test/util/create-object.stub';

describe('Servicio Registrar Alquiler', () => {
  let servicioFacturarAlquiler: ServicioFacturarAlquiler;
  let repositorioAlquilerStub: SinonStubbedInstance<RepositorioAlquiler>;
  let repositorioBicicletaStub: SinonStubbedInstance<RepositorioBicicleta>;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  let facturacionData: FacturacionDto;

  beforeEach(() => {
    repositorioAlquilerStub = createStubObj<RepositorioAlquiler>([
      'existeAlquilerSinFacturar',
      'buscarAlquiler',
      'actualizar',
      'guardar'
    ]);
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
      'existeCedulaUsuario',
      'usuarioHabilitado',
      'actualizarEstado',
      'guardar'
    ]);
    repositorioBicicletaStub = createStubObj<RepositorioBicicleta>([
      'existeBicicleta',
      'obtenerValorHora',
      'bicicletaHabilitada',
      'actualizarEstado',
      'guardar'
    ]);

    servicioFacturarAlquiler = new ServicioFacturarAlquiler(
      repositorioAlquilerStub, repositorioBicicletaStub, repositorioUsuarioStub
    );
    facturacionData = {
      idAlquiler: 9,
      valorHora: 1500,
      fechaInicio: new Date(),
      fechaEntrega: new Date()
    };
    return facturacionData;
  });

  it('Deberia falla al facturar un alquiler inexistente', async () => {
    repositorioAlquilerStub.existeAlquilerSinFacturar.returns(Promise.resolve(false));

    await expect(
      servicioFacturarAlquiler.facturarAlquiler('9')
    ).rejects.toThrow(`Alquiler con ID ${facturacionData.idAlquiler} no encontrado`);
  });

});
