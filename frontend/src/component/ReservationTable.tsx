import React from 'react';
import {Reservation, Room} from "../App";
import {format} from "date-fns";
import { fr } from 'date-fns/locale';
import axios from "axios";

interface ReservationTableProps {
    reservation: Reservation;
    onReservationConfirmed: () => void;
}
const ReservationTable: React.FC<ReservationTableProps> = ({ reservation,onReservationConfirmed }) => {


    const nights = (number : number) => {
        return reservation.rooms.length * number ;
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('/api/confirm/reservation', reservation );
            if (response.status ===200 ) {
                alert("La reservation a été enregistré")
                onReservationConfirmed();
            }else{
                alert("Erreur, a reservation annulé")
            }
        } catch (error) {
            alert("Une Erreur est survenue")
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
                    <td>{reservation.nightWeekPrice}</td>
                    <td>{nights(reservation.nightWeek)*reservation.nightWeekPrice}</td>
                </tr>
                <tr>
                    <th scope="row">Nuits Weekend</th>
                    <td>{nights(reservation.nightWeekend)}</td>
                    <td>{reservation.nightWeekendPrice}</td>
                    <td>{nights(reservation.nightWeekend)*reservation.nightWeekendPrice}</td>
                </tr>
                <tr>
                    <th scope="row">Lit Parapluie</th>
                    <td>{(reservation.extra ? 1 : 0)*reservation.rooms.length}</td>
                    <td>{reservation.extraPrice}</td>
                    <td>{(reservation.extra ? 1 : 0)*reservation.extraPrice*reservation.rooms.length}</td>
                </tr>
                <tr className={"table-active"}>
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td>{reservation.totalPrice*reservation.rooms.length}</td>
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
