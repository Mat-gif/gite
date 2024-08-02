import React, { useState } from 'react';
import { Reservation, Room } from "../App";
import RoomCard from "./RoomCard";

interface ResultSearchProps {
    onRoomSelected: (roomsSelected: Room[]) => void;  // Modifier le type pour un tableau de chambres
    reservation: Reservation;
    rooms?: Room[];
}

const ResultSearch: React.FC<ResultSearchProps> = ({ reservation, rooms, onRoomSelected }) => {
    const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);

    const handleRoomSelect = (room: Room) => {
        const isSelected = selectedRooms.some(r => r.id === room.id);

        if (isSelected) {
            setSelectedRooms(prevRooms => {
                const updatedRooms = prevRooms.filter(r => r.id !== room.id);
                onRoomSelected(updatedRooms);
                return updatedRooms;
            });
        } else {
            setSelectedRooms(prevRooms => {
                const updatedRooms = [...prevRooms, room];
                onRoomSelected(updatedRooms);
                return updatedRooms;
            });
        }
    };

    return (
        <div className={"row d-flex justify-content-center text-center"}>
            { reservation.rooms.length > 0 && (
                <div className="mt-4 ">
                    <h2>Chambres disponibles du {reservation.start} au {reservation.end}</h2>
                    <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                        {reservation.rooms.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => handleRoomSelect(room)}
                                className={`p-2 ${selectedRooms.some(r => r.id === room.id) ? 'border border-primary' : ''}`}
                            >
                                <RoomCard room={room} isSelected={selectedRooms.some(r => r.id === room.id)}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultSearch;
