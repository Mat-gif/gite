import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

export interface ReservationInt {
  room: Room;
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

  async getRoomNotBusy(start: Date, end: Date): Promise<Room[]> {
    const reservations = await this.reservationRepository.find();
    const rooms = await this.roomRepository.find(); // les chambres
    //  les chambres occupées durant la période
    const busyRooms = Array.from(
      new Set(
        reservations
          .filter(
            (reservation) => start < reservation.end && end > reservation.start,
          )
          .map((reservation) => reservation.room),
      ),
    );
    // les chambres disponibles
    return rooms.filter(
      (room) => !busyRooms.some((busyRoom) => busyRoom.id === room.id),
    );
  }

  calculateNight(reservation: ReservationInt): number[] {
    const current = new Date(reservation.start);
    let nightWeekend = 0;
    let nightWeek = 0;
    while (current < reservation.end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        nightWeekend++;
      } else {
        if (day !== 1) {
          nightWeek++;
        }
      }
      current.setDate(current.getDate() + 1);
    }
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

  // async createReservation(reservationInt: ReservationInt) {
  //   const reservation = new Reservation(reservationInt);
  //   const nights = this.calculateNight(reservationInt);
  //   reservation.nightWeek = nights[0];
  //   reservation.nightWeekend = nights[1];
  //   reservation.totalPrice = nights[0] * 7000 + nights[1] * 5000;
  //   if (reservation.extra) {
  //     reservation.totalPrice += 1000;
  //   }
  //   return reservation;
  // }
}
