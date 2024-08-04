export interface Room {
    id: number;
    childNumber: number;
    adultNumber: number;
    name: string;
    description?: string;
}

export interface Reservation {
    rooms : Room[];
    start : string;
    end : string;
    email : string;
    extra : boolean;
    nightWeek : number;
    totalPrice: number;
    nightWeekend: number;
    id?: number;
    nightWeekPrice: number;
    nightWeekendPrice: number;
    extraPrice: number;
}

export interface RoomsSearch{
    rooms : Room[];
    start : string;
    end : string;
}