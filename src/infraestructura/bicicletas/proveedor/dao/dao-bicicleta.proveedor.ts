import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { DaoAlquilerMysql } from 'src/infraestructura/alquiler/adaptador/dao/dao-alquiler-mysql';

export const DaoBicicletaProveedor = {
  provide: DaoAlquiler,
  useClass: DaoAlquilerMysql
};
