import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { RepositorioAlquilerMysql } from '../../adaptador/repositorio/repositorio-alquiler-mysql';

export const repositorioAlquilerProvedor = {
  provide: RepositorioAlquiler,
  useClass: RepositorioAlquilerMysql
};
