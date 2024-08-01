import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';

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

  @Column()
  nightWeek: number;

  @Column()
  nightWeekend: number;

  @Column({ type: 'boolean' })
  extra: boolean;
}
