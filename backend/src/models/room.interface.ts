export interface Room {
  id?: number; // Optional since it's auto-incremented
  childNumber: number;
  adultNumber: number;
  name: string;
  description?: string; // Optional field
}
