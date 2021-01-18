import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bicicleta' })
export class BicicletaEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  serial: string;

  @Column()
  color: string;

  @Column()
  almacenActual: number;

  @Column()
  fechaCompra: Date;

  @Column()
  estado: string;
};
