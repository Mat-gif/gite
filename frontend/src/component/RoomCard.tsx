import React from 'react';
import {Room} from "../App";

interface RoomCardProps {
    room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img
                className="card-img-top"
                src="https://static.cotemaison.fr/medias_11542/w_749,h_419,c_crop,x_0,y_474/w_2000,h_1125,c_fill,g_north/v1499158598/un-dejeuner-sur-la-terrasse-entre-palmiers-et-eau-turquoise_5909658.jpg"
                alt="image"
            />
            <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">
                    {room.description || 'No description available.'}
                </p>
                <ul className="list-unstyled">
                    <li><strong>Adultes:</strong> {room.adultNumber}</li>
                    <li><strong>Enfants:</strong> {room.childNumber}</li>
                </ul>
            </div>
        </div>
    );
};

export default RoomCard;


