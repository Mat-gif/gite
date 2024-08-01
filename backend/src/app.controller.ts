import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
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
    console.log(rooms);
    return rooms;
  }
}
