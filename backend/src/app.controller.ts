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
    const rooms = await this.appService.getRoomNotBusy(
      new Date(start),
      new Date(end),
    );
    return rooms;
  }

  // @Post('create/reservation')
  // async createReservation(
  //   @Body() reservationInt: ReservationInt,
  // ): Promise<Reservation> {
  //   const reservation = await this.appService.createReservation(reservationInt);
  //   return reservation;
  // }
}
