import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { DaoBicicletaMysql } from '../../adaptador/dao/dao-bicicleta-mysql';

export const DaoBicicletaProveedor = {
  provide: DaoBicicleta,
  useClass: DaoBicicletaMysql
};
