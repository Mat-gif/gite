import React, { useState } from 'react';
import { Room, RoomsSearch} from "../App";
import RoomCard from "./RoomCard";

interface ResultSearchProps {
    onRoomSelected: (roomsSelected: Room[]) => void;  // Modifier le type pour un tableau de chambres
    roomsSearch: RoomsSearch;
    rooms?: Room[];
}

const ResultSearch: React.FC<ResultSearchProps> = ({ roomsSearch, rooms, onRoomSelected }) => {
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
                </div>
            )}
        </div>
    );
};

export default ResultSearch;
