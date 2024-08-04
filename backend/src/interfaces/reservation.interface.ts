import { Room } from '../entities/room.entity';

export interface ReservationInt {
  rooms: Room[];
  email: string;
  start: Date;
  end: Date;
  extra: boolean;
}
