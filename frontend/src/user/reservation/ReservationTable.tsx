import React from 'react';
import axios, {AxiosError} from "axios";
import PriceTable from "./PriceTable";
import {showErrorAlert, showSuccessAlert} from "../../share-component/service/alerteService";
import TableHeader from "../../share-component/TableHeader";
import TableRoomRow from "../../share-component/TableRoomRow";
import Button from "../../share-component/Button";
import {Reservation} from "../../interface/interface";

interface ReservationTableProps {
    reservation: Reservation;
    onReservationConfirmed: () => void;
}
const ReservationTable: React.FC<ReservationTableProps> = ({ reservation,onReservationConfirmed }) => {

    const handleClick = async () => {
        try {
            await axios.post<Reservation>('/api/confirm/reservation', reservation );
            await showSuccessAlert('Merci !', 'La réservation a été enregistrée');
            onReservationConfirmed();
        } catch (error) {
            let message = error instanceof  AxiosError ? error.response?.data: "Erreur, reservation annulé"
            await showErrorAlert('Erreur', message)
            onReservationConfirmed();
        }
    };

    return (
        <div className="container mt-4 w-50">
            <h2 className="mb-4 text-center">Détails de la réservation</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                <TableHeader headers={["Chambre","Période"]}/>
                </thead>
                <tbody>
                <TableRoomRow reservation={reservation}/>
                </tbody>
            </table>
            <PriceTable reservation={reservation}/>
            <div className={" d-flex justify-content-center text-center"}>
                <Button message={"Confirmer"} onClick={handleClick}/>
            </div>
        </div>

    );
};

export default ReservationTable;
