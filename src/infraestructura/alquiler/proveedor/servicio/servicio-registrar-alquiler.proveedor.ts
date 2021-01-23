import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';


export function servicioRegistrarAlquilerProveedor(
  repositorioAlquiler: RepositorioAlquiler,
  repositorioBicicleta: RepositorioBicicleta,
  repositorioUsuario: RepositorioUsuario
  ) {
  return new ServicioRegistraAlquiler(
    repositorioAlquiler,
    repositorioBicicleta,
    repositorioUsuario
    );
}

