import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService, ReservationInt } from './app.service';
import { Reservation } from './entities/reservation.entity';
import { Response } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('reservations')
  async getAllReservations(): Promise<Reservation[]> {
    return await this.appService.getAllReservations();
  }

  @Get('start/:start/end/:end')
  async checkDispo(
    @Res() res: Response,
    @Param('start') start: string,
    @Param('end') end: string,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          await this.appService.getRoomsNotBusy(new Date(start), new Date(end)),
        );
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @Post('calculate/reservation')
  async calculateReservation(
    @Res() res: Response,
    @Body() reservationInt: ReservationInt,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.appService.calculateReservation(reservationInt));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @Post('confirm/reservation')
  async confirmReservation(
    @Res() res: Response,
    @Body() reservation: Reservation,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.appService.createReservation(reservation));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}
