import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Reservation } from './entities/reservation.entity';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppService', () => {
  let service: AppService;
  let reservationRepository: Repository<Reservation>;
  let roomRepository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository, // Vous pouvez aussi utiliser un mock ici si nécessaire
        },
        {
          provide: getRepositoryToken(Room),
          useClass: Repository, // Vous pouvez aussi utiliser un mock ici si nécessaire
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    reservationRepository = module.get<Repository<Reservation>>(
        getRepositoryToken(Reservation),
    );
    roomRepository = module.get<Repository<Room>>(
        getRepositoryToken(Room),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const room: Room = {
    adultNumber: 2,
    childNumber: 1,
    description: 'test',
    id: 1,
    name: 'test',
  };

  const reservation: Reservation = {
    id: 1,
    room: room,
    email: 'test1@example.com',
    start: new Date('2024-08-01'),
    end: new Date('2024-08-05'),
    nightWeek: 0,
    nightWeekend: 0,
    extra: false,
  };

  describe('calculateNight', () => {
    it('should correctly calculate nightWeek and nightWeekend', () => {
      const result = service.calculateNight(reservation);

      expect(result.nightWeek).toBe(2);
      expect(result.nightWeekend).toBe(2);
      expect(result.nightWeekend + result.nightWeek).toBe(4);
    });
  });
});
