import React from 'react';
import { Reservation } from "../App";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

interface ReservationCardProps {
    reservations?: Reservation[];
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservations }) => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center ">
                {reservations?.map((reservation) => (
                    <div className="col-md-6 col-lg-3 mb-4" key={reservation.id}>
                        <div className="card text-dark bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Reservation N°{reservation.id}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Email : {reservation.email}</li>
                                    <li className="list-group-item">Arrivé : {format(reservation.start, 'dd MMMM yyyy', { locale: fr })}</li>
                                    <li className="list-group-item">Départ : {format(reservation.end, 'dd MMMM yyyy', { locale: fr })}</li>
                                    <li className="list-group-item">Chambres : <br/> {reservation.rooms.map((room) => (
                                        <div>
                                            <span className="badge rounded-pill bg-primary"
                                                  key={room.name}>{room.name}</span><br/>
                                        </div>
                                    ))}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationCard;
