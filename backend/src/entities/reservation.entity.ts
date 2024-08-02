import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('Reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => Room, (room) => room.reservations, { eager: true })
  @JoinTable({ name: 'reservation_rooms' })
  rooms: Room[];

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ nullable: true })
  nightWeek?: number;

  @Column({ nullable: true })
  nightWeekend?: number;

  @Column({ type: 'boolean' })
  extra: boolean;

  @Column()
  totalPrice: number;
}
