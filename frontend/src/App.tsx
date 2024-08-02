import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomCard from "./component/RoomCard";
import Search from "./component/Search";
import ResultSearch from "./component/ResultSearch";
import ReservationForm from "./component/ReservationForm";
import ReservationTable from "./component/ReservationTable";

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
    email? : string;
    extra? : boolean;
    nightWeek? : number;
    totalPrice?: number;
    nightWeekend?: number;
    id?: number;

}


const App: React.FC = () => {
    const [reservation, setReservation] = useState<Reservation>();
    const [roomsSelected, setRoomSelected] = useState<Room[]>([]);
    const [tarif, setTarif] = useState<Reservation>();

    const handleRoomsUpdate = (reservation?: Reservation) => {
        setReservation(reservation);
    };
    const handleRoomSelected = (rooms: Room[]) => {
        setTarif(undefined)
        setRoomSelected(rooms);
    };

    const handleReservationCalculate= (reservation: Reservation) => {
        setTarif(reservation);
    };

    return (
        <div className="App dark-mode">
            <div className="pt-4">
                <h1 className="text-center">Calédo-Gite</h1>
            </div>
            <Search onRoomsUpdate={handleRoomsUpdate}/>
            <div className={"w-75 mx-auto mt-4"}>
                <div className={"row d-flex justify-content-center"}>
                    {reservation !== undefined && (
                        <ResultSearch reservation={reservation} onRoomSelected={handleRoomSelected}/>)}
                </div>
            </div>
            <div className={"row d-flex justify-content-center"}>
                {reservation !== undefined && roomsSelected.length > 0 && (
                    <ReservationForm roomsSelected={roomsSelected} start={reservation.start} end={reservation.end}
                                     onReservationCalculate={handleReservationCalculate}/>)}
            </div>
            <div className={"row d-flex justify-content-center"}>
                {tarif !== undefined && (    <ReservationTable reservation={tarif} />
                )}
            </div>
        </div>
    )
        ;
};

export default App;
