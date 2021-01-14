import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarUsuario', () => {

  let servicioRegistrarUsuario: ServicioRegistrarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;
  const userData = {
    nombre: 'Carlos',
    apellido: 'Perez',
    clave: '47il78',
    fechaCreacion: new Date().toISOString(),
    cedula: '39845645',
    correo: 'test@test.com.co',
    telefono: '320 894 5769',
    direccion: 'calle 45 #23 -56'
  };

  beforeEach(() => {

    repositorioUsuarioStub = createStubObj<RepositorioUsuario>(['existeNombreUsuario', 'guardar']);
    servicioRegistrarUsuario = new ServicioRegistrarUsuario(repositorioUsuarioStub);
  });

  it('si el nombre de usuario ya existe no se puede crear y deberia retonar error', async () => {

    repositorioUsuarioStub.existeNombreUsuario.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarUsuario.ejecutar(
        new Usuario(userData),
      ),
    ).rejects.toThrow('El nombre de usuario Carlos ya existe');
  });

  it('si el nombre no existe guarda el usuario el repositorio', async () => {
    const usuario = new Usuario(userData);
    repositorioUsuarioStub.existeNombreUsuario.returns(Promise.resolve(false));

    await servicioRegistrarUsuario.ejecutar(usuario);

    expect(repositorioUsuarioStub.guardar.getCalls().length).toBe(1);
    expect(repositorioUsuarioStub.guardar.calledWith(usuario)).toBeTruthy();
  });
});
