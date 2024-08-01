// src/app.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Reservation } from './models/reservation.interface';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const reservations: Reservation[] = [
    {
      id: 1,
      roomId: 1,
      email: 'test1@example.com',
      start: new Date('2024-08-01'),
      end: new Date('2024-08-05'),
      nightWeek: 4,
      nightWeekend: 0,
      extra: false,
    },
    {
      id: 2,
      roomId: 1,
      email: 'test2@example.com',
      start: new Date('2024-08-10'),
      end: new Date('2024-08-15'),
      nightWeek: 5,
      nightWeekend: 0,
      extra: false,
    },
  ];

  describe('checkDispo', () => {
    it('true when there is no overlap', () => {
      expect(
        service.checkDispo(
          reservations,
          new Date('2024-08-05'),
          new Date('2024-08-10'),
        ),
      ).toBe(true);
    });
  });

  describe('checkDispo', () => {
    it('false when there is overlap', () => {
      expect(
        service.checkDispo(
          reservations,
          new Date('2024-08-09'),
          new Date('2024-08-12'),
        ),
      ).toBe(false);
    });
  });

  const reservation: Reservation = {
    id: 1,
    roomId: 1,
    email: 'test1@example.com',
    start: new Date('2024-08-01'),
    end: new Date('2024-08-05'),
    nightWeek: 0,
    nightWeekend: 0,
    extra: false,
  };

  describe('calculateNight', () => {
    it('calculate nightWeek and nightWeekEnd', () => {

      const result = service.calculateNight(reservation);

      expect(result.nightWeek).toBe(2);
      expect(result.nightWeekend).toBe(2);
      expect(result.nightWeekend + result.nightWeek).toBe(4);
    });
  });
});
