import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioActualizarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';

export function servicioActualizarBicicletaProveedor(repositorioBicicleta: RepositorioBicicleta) {
  return new ServicioActualizarBicicleta(repositorioBicicleta);
}

export function servicioRegistrarBicicletaProveedor(repositorioBicicleta: RepositorioBicicleta) {
  return new ServicioRegistrarBicicleta(repositorioBicicleta);
}
