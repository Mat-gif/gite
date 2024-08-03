import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('Room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  childNumber: number;

  @Column()
  adultNumber: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToMany(() => Reservation, (reservation) => reservation.rooms)
  reservations: Reservation[];
}
