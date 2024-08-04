import { DataSource, Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomRepository extends Repository<Room> {
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async findAvailableRooms(start: Date, end: Date): Promise<Room[]> {
    const occupiedRooms = await this.createQueryBuilder('room')
      .leftJoin('room.reservations', 'reservation')
      .where('reservation.start < :endDate AND reservation.end > :startDate', {
        startDate: start,
        endDate: end,
      })
      .getMany();

    const occupiedRoomIds = occupiedRooms.map((room) => room.id);

    // Récupérer toutes les chambres et exclure celles qui sont occupées
    const roomsQueryBuilder = this.createQueryBuilder('room');
    if (occupiedRoomIds.length > 0) {
      roomsQueryBuilder.where('room.id NOT IN (:...occupiedRoomIds)', {
        occupiedRoomIds,
      });
    }
    return await roomsQueryBuilder.getMany();
  }

  async checkRoomAvailability(
    start: Date,
    end: Date,
    roomIds: number[],
  ): Promise<Room[]> {
    return this.createQueryBuilder('room')
      .leftJoin('room.reservations', 'reservation')
      .where('reservation.start < :endDate AND reservation.end > :startDate', {
        startDate: start,
        endDate: end,
      })
      .andWhere('room.id IN (:...roomIds)', { roomIds })
      .getMany();
  }
}
