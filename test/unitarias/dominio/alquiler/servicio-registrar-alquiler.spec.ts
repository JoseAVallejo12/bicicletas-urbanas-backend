import { SinonStubbedInstance } from 'sinon';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { createStubObj } from 'test/util/create-object.stub';

describe('Servicio Registrar Alquiler', () => {
  let servicioRegistrarAlquiler: ServicioRegistraAlquiler;
  let servicioFacturarAlquiler: ServicioFacturarAlquiler;
  let repositorioAlquilerStub: SinonStubbedInstance<RepositorioAlquiler>;
  let repositorioBicicletaStub: SinonStubbedInstance<RepositorioBicicleta>;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;

  let alquilerDto: AlquilerDto;

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
    repositorioBicicletaStub = createStubObj<RepositorioBicicleta> ([
      'existeBicicleta',
      'obtenerValorHora',
      'bicicletaHabilitada',
      'actualizarEstado',
      'guardar'
    ]);
    servicioRegistrarAlquiler = new ServicioRegistraAlquiler(
      repositorioAlquilerStub, repositorioBicicletaStub, repositorioUsuarioStub
    );

    alquilerDto = {
      cedulaUsuario: '73456879',
      idBicicleta: '3458',
      fechaAlquiler: new Date().toISOString(),
      ciudad: 'barranquilla',
      estado: true
    };
    return alquilerDto;
  });

  it('Deberia fallar al registrar alquiler a usuario no registrado', async () => {

    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(false));

    await expect(
      servicioRegistrarAlquiler.guardar(new Alquiler(alquilerDto)),
    ).rejects.toThrow(`Usuario con Cedula: ${alquilerDto.cedulaUsuario} no registrado en sistema`);
  });

  it('Deberia fallar al alquilar una bicicleta que no registrada', async () => {
    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(true));
    repositorioBicicletaStub.existeBicicleta.returns(Promise.resolve(false));

    await expect(
      servicioRegistrarAlquiler.guardar(new Alquiler(alquilerDto))
    ).rejects.toThrow(`Bicicleta con Id: ${alquilerDto.idBicicleta} no registrada en sistema`);
  });

  it('Deberia fallar al asignar mas de una bicicleta al mismo ususario', async () => {
    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(true));
    repositorioBicicletaStub.existeBicicleta.returns(Promise.resolve(true));
    repositorioUsuarioStub.usuarioHabilitado.returns(Promise.resolve(false));

    await expect(
      servicioRegistrarAlquiler.guardar(new Alquiler(alquilerDto))
    ).rejects.toThrow(`Usuario con Cedula: ${alquilerDto.cedulaUsuario} ya tiene una bicicleta asignada`);
  });

  it('Deberia fallar al alquilar una bicicleta ya alquilada', async () => {
    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(true));
    repositorioBicicletaStub.existeBicicleta.returns(Promise.resolve(true));
    repositorioUsuarioStub.usuarioHabilitado.returns(Promise.resolve(true));
    repositorioBicicletaStub.bicicletaHabilitada.returns(Promise.resolve(false));

    await expect(
      servicioRegistrarAlquiler.guardar(new Alquiler(alquilerDto))
    ).rejects.toThrow(`Bicicleta con Id: ${alquilerDto.idBicicleta} no disponible`);
  });


});
