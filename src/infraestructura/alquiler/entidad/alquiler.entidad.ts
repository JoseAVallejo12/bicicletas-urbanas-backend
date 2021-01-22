import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alquiler' })
export class AlquilerEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedulaUsuario: number;

  @Column()
  idBicicleta: number;

  @Column()
  fechaAlquiler: Date;

  @Column()
  ciudad: string;

  @Column()
  estado: boolean;

  @Column()
  fechaEntrega: Date;

  @Column()
  horasTranscurridas: number;

  @Column()
  total: number;

}
