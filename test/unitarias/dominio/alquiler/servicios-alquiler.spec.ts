import { SinonStubbedInstance } from 'sinon';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { Facturacion } from 'src/dominio/alquiler/modelo/facturar';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { createStubObj } from 'test/util/create-object.stub';

describe('Servicio Registrar Alquiler', () => {
  let servicioRegistrarAlquiler: ServicioRegistraAlquiler;
  let servicioFacturarAlquiler: ServicioFacturarAlquiler;
  let repositorioAlquilerStub: SinonStubbedInstance<RepositorioAlquiler>;
  let alquilerDto: AlquilerDto;

  beforeEach(() => {
    repositorioAlquilerStub = createStubObj<RepositorioAlquiler>([
      'existeAlquiler',
      'existeBicicleta',
      'existeUsuario',
      'usuarioHabilitado',
      'actualizarEstadoBicicleta',
      'bicicletaLibre',
      'actualizar',
      'guardar'
    ]);
    servicioRegistrarAlquiler = new ServicioRegistraAlquiler(repositorioAlquilerStub);
    servicioFacturarAlquiler = new ServicioFacturarAlquiler(repositorioAlquilerStub);
    alquilerDto = {
      cedulaUsuario: '73456879',
      idBicicleta: '3458',
      fechaAlquiler: new Date().toISOString(),
      ciudad: 'barranquilla',
      estado: true
    };
    return alquilerDto;
  });

  it('Usuario con una bicicleta asiganada activa', async () => {

    repositorioAlquilerStub.usuarioHabilitado.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarAlquiler.guardar(new Alquiler(alquilerDto)),
    ).rejects.toThrow(`Usuario con Cedula: ${alquilerDto.cedulaUsuario} no registrado en sistema`);
  });


  it('Actualizar Alquiler no registrado', async () => {

    const facturacionDto = {
      idAlquiler: '9',
      valorHora: '1500',
      fechaInicio: new Date().toISOString(),
      fechaEntrega: new Date().toISOString()
    };
    repositorioAlquilerStub.existeAlquiler.returns(Promise.resolve(false));

    await expect(
      servicioFacturarAlquiler.actualizarAlquiler(new Facturacion(facturacionDto)),
    ).rejects.toThrow(`Alquiler Id: ${facturacionDto.idAlquiler} no encontrado`);
  });

});
