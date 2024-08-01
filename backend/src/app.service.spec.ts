import { Test, TestingModule } from '@nestjs/testing';
import { AppService, ReservationInt } from './app.service';
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
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const room: Room = {
    id: 1,
    adultNumber: 2,
    childNumber: 1,
    name: 'Test Room',
    description: 'A test room',
  };

  const reservation: ReservationInt = {
    room: room,
    email: 'test1@example.com',
    start: new Date('2024-08-01'),
    end: new Date('2024-08-05'),
    extra: false,
  };

  describe('createReservation', () => {
    it('should correctly calculate nightWeek, nightWeekend, and totalPrice', async () => {
      jest.spyOn(service, 'calculateNight').mockImplementation(() => [2, 2]);

      const result = await service.createReservation(reservation);

      expect(result.nightWeek).toBe(2);
      expect(result.nightWeekend).toBe(2);
      expect(result.totalPrice).toBe(2 * 7000 + 2 * 5000);
    });

    it('should correctly adjust totalPrice if extra is true', async () => {
      const reservationWithExtra: ReservationInt = {
        ...reservation,
        extra: true,
      };
      jest.spyOn(service, 'calculateNight').mockImplementation(() => [2, 2]); // Mocking calculateNight

      const result = await service.createReservation(reservationWithExtra);

      expect(result.totalPrice).toBe(2 * 7000 + 2 * 5000 + 1000);
    });
  });
});
