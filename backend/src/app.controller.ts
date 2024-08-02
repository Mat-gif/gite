import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, ReservationInt } from './app.service';
import { Reservation } from './entities/reservation.entity';
import { Room } from './entities/room.entity';

// Assurez-vous que ce chemin est correct

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello() {
    return 'hello';
  }
  @Get('reservations')
  async getAllReservations(): Promise<Reservation[]> {
    const reservations = await this.appService.getAllReservations();
    console.log('Fetched Reservations:', reservations);
    return reservations;
  }

  @Get('start/:start/end/:end')
  async checkDispo(
    @Param('start') start: string,
    @Param('end') end: string,
  ): Promise<Room[]> {
    const rooms = await this.appService.getRoomsNotBusy(
      new Date(start),
      new Date(end),
    );
    return rooms;
  }

  @Post('calculate/reservation')
  async calculateReservation(
    @Body() reservationInt: ReservationInt,
  ): Promise<Reservation> {
    const reservation =
      await this.appService.calculateReservation(reservationInt);
    return reservation;
  }

  @Post('confirm/reservation')
  async confirmReservation(
    @Body() reservation: Reservation,
  ): Promise<Reservation> {
    await this.appService.createReservation(reservation);
    return reservation;
  }
}
