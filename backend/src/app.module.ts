import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Room } from './entities/room.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Price } from './entities/price.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'mydatabase',
      entities: [Reservation, Room, Price],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Reservation, Room, Price]),
  ],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {}
