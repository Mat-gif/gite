import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

export interface ReservationInt {
  rooms: Room[];
  email: string;
  start: Date;
  end: Date;
  extra: boolean;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async getRoomsNotBusy(start: Date, end: Date): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('r')
      .leftJoin('reservation_rooms', 'r_res', 'r_res.room_id = r.id')
      .leftJoin('Reservation', 'res', 'res.id = r_res.reservation_id')
      .where('(res.start IS NULL OR res.end IS NULL)')
      .orWhere('res.end <= :start OR res.start >= :end', {
        start,
        end,
      })
      .getMany();
  }

  private calculateNight(reservation: { start: Date; end: Date }): number[] {
    const current = new Date(reservation.start);
    const end = new Date(reservation.end);
    let nightWeekend = 0;
    let nightWeek = 0;
    while (current < end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        nightWeekend += 1;
      } else if (day !== 1) {
        nightWeek += 1;
      }
      current.setDate(current.getDate() + 1);
    }

    console.log('Nights Week:', nightWeek, 'Nights Weekend:', nightWeekend);
    return [nightWeek, nightWeekend];
  }

  async getFutureReservations(): Promise<Reservation[]> {
    const now = new Date();
    return this.reservationRepository.find({
      where: {
        start: MoreThan(now),
      },
    });
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async calculateReservation(reservationInt: ReservationInt) {
    const reservation: Reservation = this.newReservation(reservationInt);

    const nights = this.calculateNight(reservationInt);
    reservation.nightWeek = nights[0];
    reservation.nightWeekend = nights[1];
    reservation.totalPrice = nights[0] * 7000 + nights[1] * 5000;
    if (reservation.extra) {
      reservation.totalPrice += 1000;
    }
    return reservation;
  }

  async createReservation(reservation: Reservation) {
    console.log(reservation);
    return this.reservationRepository.save(reservation);
  }

  private newReservation(reservationInt: ReservationInt) {
    return {
      email: reservationInt.email,
      end: reservationInt.end,
      extra: reservationInt.extra,
      nightWeek: 0,
      nightWeekend: 0,
      rooms: reservationInt.rooms,
      start: reservationInt.start,
      totalPrice: 0,
    };
  }
}
