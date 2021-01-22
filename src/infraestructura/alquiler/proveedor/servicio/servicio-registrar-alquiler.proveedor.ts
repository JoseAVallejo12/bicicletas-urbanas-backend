import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';


export function servicioRegistrarAlquilerProveedor(repositorioAlquiler: RepositorioAlquiler) {
  return new ServicioRegistraAlquiler(repositorioAlquiler);
}

