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
  @JoinTable({
    name: 'reservation_rooms',
    joinColumn: { name: 'reservation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'room_id', referencedColumnName: 'id' },
  })
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

  @Column()
  nightWeekPrice: number;

  @Column()
  nightWeekendPrice: number;

  @Column()
  extraPrice: number;
}
