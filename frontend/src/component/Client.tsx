// src/Alert.tsx
import React, {useState} from 'react';
import Search from "./Search";
import ResultSearch from "./ResultSearch";
import ReservationForm from "./ReservationForm";
import ReservationTable from "./ReservationTable";
import {Reservation, Room, RoomsSearch} from "../App";

// Définir l'interface pour les props
interface ClientProps {

}

const Client: React.FC<ClientProps> = () => {
    const [roomsSearch, setRoomsSearch] = useState<RoomsSearch>();
    const [roomsSelected, setRoomSelected] = useState<Room[]>([]);
    const [tarif, setTarif] = useState<Reservation>();

    const handleRoomsUpdate = (roomsSearch?: RoomsSearch) => {
        setTarif(undefined);
        setRoomsSearch(roomsSearch);
    };
    const handleRoomSelected = (rooms: Room[]) => {
        setTarif(undefined);
        setRoomSelected(rooms);
    };

    const handleReservationCalculate= (reservation: Reservation) => {
        setTarif(undefined);
        setTarif(reservation);
    };

    const handleReservationConfirmed = () => {
        // Réinitialiser l'état global ou effectuer d'autres actions après la confirmation
        setRoomsSearch(undefined);
        setRoomSelected([]);
        setTarif(undefined);
    };

    return (
        <div>
            <div className="pt-4">
                <h1 className="text-center">Calédo-Gite</h1>
            </div>
            <Search onRoomsUpdate={handleRoomsUpdate}/>
            <div className={"w-75 mx-auto mt-4"}>
                <div className={"row d-flex justify-content-center"}>
                    {roomsSearch !== undefined && (
                        <ResultSearch roomsSearch={roomsSearch} onRoomSelected={handleRoomSelected}/>)}
                </div>
            </div>
            <div className={"row d-flex justify-content-center"}>
                {roomsSearch !== undefined && roomsSelected.length > 0 && (
                    <ReservationForm roomsSelected={roomsSelected} start={roomsSearch.start} end={roomsSearch.end}
                                     onReservationCalculate={handleReservationCalculate}/>)}
            </div>
            <div className={"row d-flex justify-content-center"}>
                {tarif !== undefined && (
                    <ReservationTable reservation={tarif} onReservationConfirmed={handleReservationConfirmed}/>
                )}
            </div>
        </div>
    );
};

export default Client;
