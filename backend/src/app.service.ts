import { Injectable } from '@nestjs/common';
import { Reservation } from './models/reservation.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  checkDispo(reservations: Reservation[], start: Date, end: Date): boolean {
    return !reservations.some(
      (reservation) => start < reservation.end && end > reservation.start,
    );
  }
  calculateNight(reservation: Reservation): Reservation {
    const current = new Date(reservation.start);

    while (current < reservation.end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        reservation.nightWeekend++;
      } else {
        reservation.nightWeek++;
      }
      current.setDate(current.getDate() + 1);
    }
    return reservation;
  }
}
