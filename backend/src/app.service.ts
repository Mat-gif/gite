import { BadRequestException, Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Price } from './entities/price.entity';

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
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  //  Chambres disponible
  async getRoomsNotBusy(start: Date, end: Date): Promise<Room[]> {
    if (new Date(start) >= new Date(end)) {
      throw new BadRequestException(
        'La date de début doit etre avant celle de fin',
      );
    }
    if (new Date(start).getDay() === 1 || new Date(end).getDay() === 1) {
      throw new BadRequestException(
        'La date de début ou de fin ne doit pas être un lundi.',
      );
    }
    return this.roomRepository
      .createQueryBuilder('ro')
      .leftJoin('reservation_rooms', 're_ro', 're_ro.room_id = ro.id')
      .leftJoin('Reservation', 're', 're.id = re_ro.reservation_id')
      .where('(re.start IS NULL OR re.end IS NULL)')
      .orWhere('re.end <= :start OR re.start >= :end', {
        start,
        end,
      })
      .getMany();
  }

  // calcul des nombres de nuit
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
    return [nightWeek, nightWeekend];
  }

  // toute les reservations
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  // calculs des tarifs
  async calculateReservation(reservationInt: ReservationInt) {
    return this.newReservation(
      reservationInt,
      this.calculateNight(reservationInt),
    );
  }

  // ajouter une réservation
  async createReservation(reservation: Reservation) {
    return this.reservationRepository.save(reservation);
  }

  // creer une reservation
  async newReservation(
    reservationInt: ReservationInt,
    nights: number[],
  ): Promise<Reservation> {
    const [weekendPrice, weekPrice, extraPrice] = await Promise.all([
      this.priceRepository.findOneBy({
        type: 'weekend',
      }),
      this.priceRepository.findOneBy({ type: 'week' }),
      this.priceRepository.findOneBy({ type: 'extra' }),
    ]);
    const extra = reservationInt.extra ? 1 : 0;
    return {
      email: reservationInt.email,
      end: reservationInt.end,
      extra: reservationInt.extra,
      rooms: reservationInt.rooms,
      start: reservationInt.start,
      nightWeekPrice: weekendPrice.price,
      nightWeekendPrice: weekPrice.price,
      extraPrice: extraPrice.price,
      nightWeek: nights[0],
      nightWeekend: nights[1],
      totalPrice:
        nights[0] * weekendPrice.price +
        nights[1] * weekPrice.price +
        extra * extraPrice.price,
    };
  }
}
