import { Injectable } from "@nestjs/common";
import { ServicioActualizarBicicleta } from "src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta";
import { ComandoActualizarBicicleta } from "./actualizar-bicicleta.comando";

@Injectable()
export class ManejadorActualizarBicicleta {
  constructor (private servicioactualizarBicicleta: ServicioActualizarBicicleta) {}

  async ejecutar(comandoactualizarBicicleta: ComandoActualizarBicicleta) {
    await this.servicioactualizarBicicleta.actualizarBicicleta(
      comandoactualizarBicicleta.estado,
      comandoactualizarBicicleta.id
    );
  }
}
