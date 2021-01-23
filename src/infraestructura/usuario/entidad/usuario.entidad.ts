import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  estado: boolean;

  @Column()
  fechaCreacion: Date;

  @Column()
  cedula: number;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;
}
