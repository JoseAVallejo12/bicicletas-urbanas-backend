import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioActualizarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta';

export function servicioActualizarBicicletaProveedor(repositorioBicicleta: RepositorioBicicleta) {
  return new ServicioActualizarBicicleta(repositorioBicicleta);

}
