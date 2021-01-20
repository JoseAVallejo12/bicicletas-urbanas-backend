import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { DaoAlquilerMysql } from '../../adaptador/dao/dao-alquiler-mysql';

export const DaoAlquilerProvedor = {
  provide: DaoAlquiler,
  useClass: DaoAlquilerMysql
};
