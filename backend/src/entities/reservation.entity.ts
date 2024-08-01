import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { ReservationInt } from '../app.service';

@Entity('Reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, { eager: true })
  room: Room;

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

  // constructor(reservation: ReservationInt) {
  //   this.room = reservation.room;
  //   this.email = reservation.email;
  //   this.start = reservation.start;
  //   this.end = reservation.end;
  //   this.extra = reservation.extra;
  //
  //   this.nightWeek = 0;
  //   this.nightWeekend = 0;
  //   this.totalPrice = 0;
  // }
}
