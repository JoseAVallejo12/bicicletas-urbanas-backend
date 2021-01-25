import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('Usuario', () => {

  const _Usuario = Usuario;

  it('Crear un Nuevo usuario', () => {
    const userData: UsuarioDto = {
      nombre: 'Carlos',
      apellido: 'Perez',
      estado: true,
      fechaCreacion: new Date().toISOString(),
      cedula: '39845645',
      correo: 'test@test.com.co',
      telefono: '320 894 5769',
      direccion: 'calle 45 #23 -56'
    };

    const usuario = new _Usuario(userData);

    expect(usuario.nombre).toEqual(userData.nombre);
    expect(usuario.cedula).toEqual(parseInt(userData.cedula));
  });
});
