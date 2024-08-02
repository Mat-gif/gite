import React from 'react';
import {Reservation, Room} from "../App";
import {format} from "date-fns";
import { fr } from 'date-fns/locale';
import axios from "axios";

interface ReservationTableProps {
    reservation: Reservation;
}
const ReservationTable: React.FC<ReservationTableProps> = ({ reservation }) => {

    const weekPrice = () => {
        return reservation.rooms.length * 5000 * (reservation.nightWeek !== undefined ? reservation.nightWeek:  0);
    };
    const weekEndPrice = () => {
        return reservation.rooms.length *reservation.rooms.length * 7000 * (reservation.nightWeekend !== undefined ? reservation.nightWeekend:  0);
    };
    const nights = (number? : number) => {
        return reservation.rooms.length * (number !== undefined ? number:  0);
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('/api/confirm/reservation', reservation );
            console.log('Réponse du serveur :', response.data);


        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    };

    return (
        <div className="container mt-4 w-50">
            <h2 className="mb-4 text-center">Détails de la réservation</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Chambre</th>
                    <th scope="col">Période</th>
                </tr>
                </thead>
                <tbody>
                {reservation.rooms.map((room: Room) => (
                    <tr key={room.id}>
                        <td>{room.name}</td>
                        <td>du {format(reservation.start, 'dd MMMM yyyy', { locale: fr })} au {format(reservation.end, 'dd MMMM yyyy', { locale: fr })}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <table className="table">
                <thead className="thead-dark">
                <tr className={"table-active"}>
                    <th scope="col"></th>
                    <th scope="col">Unité</th>
                    <th scope="col">Prix Unitaire</th>
                    <th scope="col">Prix</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">Nuits Semaine</th>
                    <td>{nights(reservation.nightWeek)}</td>
                    <td>5000</td>
                    <td>{weekPrice()}</td>
                </tr>
                <tr>
                    <th scope="row">Nuits Weekend</th>
                    <td>{nights(reservation.nightWeekend)}</td>
                    <td>7000</td>
                    <td>{weekEndPrice()}</td>
                </tr>
                <tr>
                    <th scope="row">Lit Parapluie</th>
                    <td>{reservation.extra ? 1 : 0}</td>
                    <td>1000</td>
                    <td>{reservation.extra ? 1000 : 0}</td>
                </tr>
                <tr className={"table-active"}>
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td>{reservation.totalPrice ?? '0'}</td>
                </tr>
                </tbody>
            </table>

            <div className={" d-flex justify-content-center text-center"}>
                <button className="btn btn-primary" onClick={handleClick} >Confirmer</button>
            </div>
        </div>

    );
};

export default ReservationTable;
