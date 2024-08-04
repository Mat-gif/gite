// src/components/RoomRow.tsx
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {Reservation} from "../interface/interface";

interface RoomRowProps {
    reservation: Reservation;
}

const RoomRow: React.FC<RoomRowProps> = ({ reservation }) => {
    return (
        <>
            {reservation.rooms.map((room) => (
                <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>
                        du {format(reservation.start, 'dd MMMM yyyy', { locale: fr })}
                         au {format(reservation.end, 'dd MMMM yyyy', { locale: fr })}
                    </td>
                </tr>
            ))}
        </>
    );
};

export default RoomRow;
