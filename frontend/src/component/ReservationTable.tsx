import React from 'react';
import {Reservation, Room} from "../App";
import {format} from "date-fns";
import { fr } from 'date-fns/locale';
import axios, {AxiosError} from "axios";
import Swal from "sweetalert2";
import PriceTable from "./PriceTable";

interface ReservationTableProps {
    reservation: Reservation;
    onReservationConfirmed: () => void;
}
const ReservationTable: React.FC<ReservationTableProps> = ({ reservation,onReservationConfirmed }) => {


    const handleClick = async () => {
        try {
            const response = await axios.post<Reservation>('/api/confirm/reservation', reservation );
            await Swal.fire({
                title: 'Merci !',
                text: "La reservation a été enregistré",
                icon: 'success',
                confirmButtonText: 'ok'
            })
            onReservationConfirmed();
        } catch (error) {
            let message = error instanceof  AxiosError ? error.response?.data: "Erreur, reservation annulé"
            await Swal.fire({
                title: 'Attention !',
                text: message,
                icon: 'error',
                confirmButtonText: 'ok'
            })

            onReservationConfirmed();

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
            <PriceTable reservation={reservation}/>

            <div className={" d-flex justify-content-center text-center"}>
                <button className="btn btn-primary" onClick={handleClick} >Confirmer</button>
            </div>
        </div>

    );
};

export default ReservationTable;
