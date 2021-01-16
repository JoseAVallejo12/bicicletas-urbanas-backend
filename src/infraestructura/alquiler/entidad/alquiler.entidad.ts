import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alquiler' })
export class AlquilerEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedulaUsuario: string;

  @Column()
  serialBicicleta: string;

  @Column()
  fechaAlquiler: Date;

  @Column()
  ciudad: string;

  @Column()
  estado: boolean;
}
