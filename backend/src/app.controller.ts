import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Reservation } from './entities/reservation.entity';
import { Response } from 'express';
import { ReservationInt } from './interfaces/reservation.interface';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppService.name);

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
      this.logger.error(error);
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
      this.logger.error(error);
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
      this.logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}
