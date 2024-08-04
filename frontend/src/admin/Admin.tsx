import React, { useState, useEffect } from "react";
import ReservationCard from "./ReservationCard";
import axios, {AxiosError} from "axios";
import {Reservation} from "../interface/interface";


interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get<Reservation[]>(`/api/reservations`);
                setReservations(response.data);
            } catch (error) {
                error instanceof  AxiosError ? setError(error.response?.data): setError("Une erreur est survenue.")
            }
        };

        fetchReservations();
    }, []);


    if (error) {
        return <p>Erreur : {error}</p>;
    }


    return (
        <div>
            <div className="text-center">

                <h1 className={"mb-4"}>Liste des Réservations</h1>
                <div className={"mb-4"}>Selectionnez une réservation pour plus d'informations</div>


            </div>
            <ReservationCard reservations={reservations}/>
        </div>
    );
};

export default Admin;
