import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioBicicletaMsql } from '../../adaptador/repositorio/repositorio-bicicleta-mysql';

export const repositorioBicicletaProvedor = {
  provide: RepositorioBicicleta,
  useClass: RepositorioBicicletaMsql
};
