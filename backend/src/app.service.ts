import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Price } from './entities/price.entity';
import { RoomRepository } from './repositories/room.repository';

export interface ReservationInt {
  rooms: Room[];
  email: string;
  start: Date;
  end: Date;
  extra: boolean;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private roomRepository: RoomRepository,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  //  Chambres disponible
  async getRoomsNotBusy(start: Date, end: Date): Promise<Room[]> {
    if (start >= end) {
      throw new BadRequestException(
        'La date de début doit etre avant celle de fin',
      );
    }
    if (start.getDay() === 1 || end.getDay() === 2) {
      throw new BadRequestException(
        'La date de début ou de fin ne doit pas être un lundi.',
      );
    }
    return await this.roomRepository.findAvailableRooms(start, end);
  }

  // calcul des nombres de nuit
  private calculateNight(reservation: { start: Date; end: Date }): number[] {
    if (reservation.start >= reservation.end) {
      throw new BadRequestException(
        'La date de début doit etre avant celle de fin',
      );
    }

    const current = new Date(reservation.start);
    const end = new Date(reservation.end);
    let nightWeekend = 0;
    let nightWeek = 0;
    while (current < end) {
      const day = current.getDay();
      if (day === 5 || day === 6) {
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
    const occupiedRooms = await this.roomRepository.checkRoomAvailability(
      reservation.start,
      reservation.end,
      reservation.rooms.map((room) => room.id),
    );

    if (occupiedRooms.length > 0) {
      throw new BadRequestException("La chambre n'est plus disponible.");
    }

    const roomLabels = reservation.rooms.map((room) => room.name).join(', ');
    this.logger.log(
      `Nouvelle réservation du ${reservation.start} au ${reservation.start}${reservation.start} pour les chambres ${roomLabels}`,
    );
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
      nightWeek: nights[0] * reservationInt.rooms.length,
      nightWeekend: nights[1] * reservationInt.rooms.length,
      totalPrice:
        (nights[0] * weekendPrice.price +
          nights[1] * weekPrice.price +
          extra * extraPrice.price) *
        reservationInt.rooms.length,
    };
  }
}
