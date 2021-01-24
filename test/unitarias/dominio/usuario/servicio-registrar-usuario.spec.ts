import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';


describe('ServicioRegistrarUsuario', () => {

  let servicioRegistrarUsuario: ServicioRegistrarUsuario;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;
  let userData: UsuarioDto;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioUsuario>(['existeCedulaUsuario', 'guardar']);
    servicioRegistrarUsuario = new ServicioRegistrarUsuario(repositorioUsuarioStub);
    const minNumCc = 72289920;
    const maxNumCc = 79900399;

    userData = {
      nombre: 'Carlos',
      apellido: 'Perez',
      estado: true,
      fechaCreacion: new Date().toISOString(),
      cedula: (Math.floor(Math.random() * (maxNumCc - minNumCc + 1)) + minNumCc).toString(),
      correo: 'test@test.com.co',
      telefono: '320 894 5769',
      direccion: 'calle 45 #23 -56'
    };
    return userData;
  });

  it('si el nombre de usuario ya existe no se puede crear y deberia retonar error', async () => {

    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarUsuario.ejecutar(
        new Usuario(userData),
      ),
    ).rejects.toThrow(`El Usuario con cedula numero: ${userData.cedula} ya existe`);
  });

  it('si la cedula no existe, guarda el usuario', async () => {
    const usuario = new Usuario(userData);
    repositorioUsuarioStub.existeCedulaUsuario.returns(Promise.resolve(false));

    await servicioRegistrarUsuario.ejecutar(usuario);

    expect(repositorioUsuarioStub.guardar.getCalls().length).toBe(1);
    expect(repositorioUsuarioStub.guardar.calledWith(usuario)).toBeTruthy();
  });
});
