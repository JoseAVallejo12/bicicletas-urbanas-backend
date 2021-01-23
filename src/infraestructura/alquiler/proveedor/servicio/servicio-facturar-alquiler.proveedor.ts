import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';

export function servicioFacturarAlquilerProveedor(
  repositorioAlquiler: RepositorioAlquiler,
  repositorioBicicleta: RepositorioBicicleta,
  repositorioUsuario: RepositorioUsuario
  ) {
  return new ServicioFacturarAlquiler(
    repositorioAlquiler,
    repositorioBicicleta,
    repositorioUsuario
    );
}
