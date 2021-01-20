import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';

export function servicioFacturarAlquilerProveedor(repositorioAlquiler: RepositorioAlquiler) {
  return new ServicioFacturarAlquiler(repositorioAlquiler);
}
