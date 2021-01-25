import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';

export function servicioRegistrarBicicletaProveedor(repositorioBicicleta: RepositorioBicicleta) {
  return new ServicioRegistrarBicicleta(repositorioBicicleta);
}
