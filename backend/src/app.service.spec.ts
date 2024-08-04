import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Price } from './entities/price.entity';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';

describe('AppService', () => {
  let service: AppService;
  let priceRepository: Repository<Price>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let reservationRepository: Repository<Reservation>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let roomRepository: Repository<Room>;

  const weekendPrice = { price: 7000 };
  const weekPrice = { price: 5000 };
  const extraPrice = { price: 1000 };

  const types = {
    weekend: weekendPrice,
    week: weekPrice,
    extra: extraPrice,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Price),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    reservationRepository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    priceRepository = module.get<Repository<Price>>(getRepositoryToken(Price));
  });

  describe('calculateNight', () => {
    it('calculate nights correctly', () => {
      const reservation = {
        start: new Date('2024-08-01T00:00:00Z'), // Jeudi
        end: new Date('2024-08-04T00:00:00Z'), // Dimanche
      };
      const [nightWeek, nightWeekend] = service['calculateNight'](reservation);
      expect(nightWeek).toBe(1); // jeudi
      expect(nightWeekend).toBe(2); // vendredi + samedi
    });

    it('return exception if start = end', () => {
      const reservation = {
        start: new Date('2024-08-01T00:00:00Z'),
        end: new Date('2024-08-01T00:00:00Z'),
      };
      expect(() => service['calculateNight'](reservation)).toThrow(
        new BadRequestException(
          'La date de début doit etre avant celle de fin',
        ),
      );
    });

    it('return exception  if start > end', () => {
      const reservation = {
        start: new Date('2024-08-05T00:00:00Z'),
        end: new Date('2024-08-01T00:00:00Z'),
      };
      expect(() => service['calculateNight'](reservation)).toThrow(
        new BadRequestException(
          'La date de début doit etre avant celle de fin',
        ),
      );
    });
  });

  // simuler un acces BDD
  const mockPriceRepository = (types: { [key: string]: any }) => {
    jest
      .spyOn(priceRepository, 'findOneBy')
      .mockImplementation(({ type }: { type: string }) => {
        return Promise.resolve(types[type] || null);
      });
  };

  const testTotalPriceCalculation = async (
    reservationInt: any,
    expectedTotalPrice: number,
    types: { [key: string]: any },
  ) => {
    mockPriceRepository(types); /// Mock
    const result = await service.newReservation(reservationInt, [2, 2]);
    expect(result.totalPrice).toBe(expectedTotalPrice);
  };

  describe('newReservation', () => {
    it('should calculate totalPrice with 2 rooms and extra correctly', async () => {
      const reservationInt = {
        email: 'test@example.com',
        start: new Date('2024-08-01T00:00:00Z'),
        end: new Date('2024-08-05T00:00:00Z'),
        extra: true,
        rooms: [new Room(), new Room()],
      };
      await testTotalPriceCalculation(reservationInt, 50000, types);
    });

    it('calculate totalPrice with 1 room no extra correctly', async () => {
      const reservationInt = {
        email: 'test@example.com',
        start: new Date('2024-08-01T00:00:00Z'),
        end: new Date('2024-08-05T00:00:00Z'),
        extra: false,
        rooms: [new Room()],
      };
      await testTotalPriceCalculation(reservationInt, 24000, types);
    });
  });
});
