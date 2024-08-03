import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Price')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  type: string;

  @Column()
  price: number;
}
