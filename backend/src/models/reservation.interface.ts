export interface Reservation {
  id?: number;
  roomId: number;
  email: string;
  start: Date;
  end: Date;
  nightWeek: number;
  nightWeekend: number;
  extra: boolean;
}
