import React, { useState } from 'react';
import RoomCard from "./RoomCard";
import {toggleRoomSelection} from "./service/roomSelectionService";
import ReservationForm from "./ReservationForm";
import ReservationTable from "./ReservationTable";
import {Reservation, Room, RoomsSearch} from "../../interface/interface";

interface ResultSearchProps {
    onReservationConfirmed: () => void;  // Modifier le type pour un tableau de chambres
    roomsSearch: RoomsSearch;
    rooms?: Room[];
}

const SearchResult: React.FC<ResultSearchProps> = ({ roomsSearch, rooms, onReservationConfirmed }) => {
    const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
    const [tarif, setTarif] = useState<Reservation>();

    const handleRoomSelect = (room: Room) => {
        const updatedRooms = toggleRoomSelection(selectedRooms, room);
        setSelectedRooms(updatedRooms);
        setTarif(undefined)
    };

    const handleReservationCalculate= (reservation: Reservation) => {
        setTarif(reservation);
    };

    return (
        <div className={"row d-flex justify-content-center text-center"}>
            { roomsSearch.rooms.length > 0 && (
                <div className="mt-4 ">
                    <h2>Chambres disponibles du {roomsSearch.start} au {roomsSearch.end}</h2>
                    <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                        {roomsSearch.rooms.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => handleRoomSelect(room)}
                                className={`p-2 ${selectedRooms.some(r => r.id === room.id) ? 'border border-primary' : ''}`}
                            >
                                <RoomCard room={room} isSelected={selectedRooms.some(r => r.id === room.id)}/>
                            </div>
                        ))}
                    </div>
                    <div className={"row d-flex justify-content-center"}>
                        {selectedRooms.length > 0 && (
                            <ReservationForm roomsSelected={selectedRooms} start={roomsSearch.start}
                                             end={roomsSearch.end}
                                             onReservationCalculate={handleReservationCalculate}/>)}
                    </div>
                    <div className={"row d-flex justify-content-center"}>
                        {tarif !== undefined && (
                            <ReservationTable reservation={tarif} onReservationConfirmed={()=>onReservationConfirmed()}/>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
