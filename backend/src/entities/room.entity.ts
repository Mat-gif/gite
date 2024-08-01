import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
