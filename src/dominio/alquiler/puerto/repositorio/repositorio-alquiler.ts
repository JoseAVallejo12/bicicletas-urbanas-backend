import { Alquiler } from '../../modelo/alquiler';


export abstract class RepositorioAlquiler {
  abstract existeIdAlquiler(id: string): Promise<boolean>;
  abstract guardar(usuario: Alquiler);
}